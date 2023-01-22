import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { File, Files, formidable } from "formidable";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

import { Item, Category } from "../../../models";

export const config = {
  api: {
    bodyParser: false,
  },
};

type TFilePositionParsed = { name: string; indexOfImage: number };

const checkFileType = (file: File): boolean => {
  if (file.originalFilename) {
    let fileType = file.originalFilename.split(".").at(-1) as string;
    const validTypes = ["jpg", "jpeg"];
    if (validTypes.includes(fileType)) return true;
    return false;
  }
  return false;
};

const saveFile = (file: File): string => {
  const fileType = file.originalFilename!.split(".").at(-1);
  const fileName = uuidv4() + "." + fileType;
  const data = fs.readFileSync(file.filepath);
  fs.writeFileSync(
    `${process.env.NEXT_PUBLIC_FILEPATH_TO_USER_ITEM_IMAGES_BACKEND}${fileName}`,
    data
  );
  return fileName;
};

const findImagePlace = (
  name: string,
  filePositionParsed: TFilePositionParsed[]
): number => {
  const foundFile = filePositionParsed.find((image) => {
    return image.name === name;
  });
  return foundFile?.indexOfImage as number;
};

const makeArray = (itemToCheck: any): any[] | undefined => {
  // to make sure that something is always an array
  let newArray: any[] = [];

  if (!itemToCheck) return undefined;

  if (!Array.isArray(itemToCheck)) {
    newArray.push(itemToCheck);
  } else {
    newArray = [...itemToCheck];
  }

  return newArray;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    //get all items
    case "GET":
      let { limit } = req.query;
      const limitNumber = Number(limit);

      try {
        const items = await Item.findAll({ limit: limitNumber });

        res.status(200).json(items);
      } catch (error: any) {
        res.status(400).json({ message: error.message });
      }
      break;

    //create or edit one item
    case "POST":
      try {
        const response = await new Promise((resolve, reject) => {
          const item_id = req.query.item_id as string;

          const form = formidable({
            multiples: true,
            maxFileSize: 50 * 1024 * 1024,
          });

          form.parse(req, async (err, fields, files) => {
            if (err) {
              return reject(err);
            }

            const session = await unstable_getServerSession(
              req,
              res,
              authOptions
            );

            if (!session) return reject("please log in to sell an item");

            const {
              name,
              category,
              price,
              images: previousImages,
              filePositionInArray,
              description,
              location,
              number,
            } = fields;

            const phone_number = number.length === 0 ? null : number;

            if (
              !name ||
              !category ||
              !price ||
              !description ||
              !location ||
              !files
            )
              return reject("no required fields");

            let filePositionParsed: TFilePositionParsed[] = [];
            if (Array.isArray(filePositionInArray)) {
              filePositionInArray.forEach((position) => {
                const parsedPosition = JSON.parse(position);
                filePositionParsed.push(parsedPosition);
              });
            } else {
              filePositionParsed.push(JSON.parse(filePositionInArray));
            }

            const { images }: Files = files;
            let imagesArray: File[] | undefined = [];
            imagesArray = makeArray(images);

            let imagePaths: string[] = [];
            filePositionParsed.forEach((_) => imagePaths.push("0")); // filling imagPaths array to use .splice on it after

            const putImagePathInArray = (
              imagePosition: number,
              imagePath: string
            ) => {
              imagePaths.splice(imagePosition, 1, imagePath);
            };

            let previousImagesArray: string[] | undefined = [];
            previousImagesArray = makeArray(previousImages);

            if (previousImagesArray) {
              // if we upload only new photos it will break because there won't be any previousImages
              // array of original images and just putting them in paths
              previousImagesArray.forEach((previousImage) => {
                const imagePosition = findImagePlace(
                  previousImage,
                  filePositionParsed
                );
                putImagePathInArray(imagePosition, previousImage);
              });
            }

            if (imagesArray) {
              for (let index = 0; index < imagesArray.length; index++) {
                const image = imagesArray[index];
                const isValid = checkFileType(image);
                if (!isValid) {
                  return reject("invalid file type");
                }
                const imageOriginalName = image.originalFilename as string;
                const imagePosition = findImagePlace(
                  imageOriginalName,
                  filePositionParsed
                );
                const imagePath = saveFile(image);
                putImagePathInArray(imagePosition, imagePath);
              }
            }

            const categoryModel = await Category.findOne({
              where: { name: category },
            });

            if (!categoryModel) reject("something unexpected happened");

            if (item_id) {
              // edit or add new item
              const item = await Item.findByPk(item_id);
              if (!item) return reject("no item with such id");
              if (item.user_id !== session.user?.id)
                return reject("you don't have permission to edit this item");

              await item.update({
                name,
                category,
                price,
                images: imagePaths,
                description,
                location,
                user_id: session?.user?.id,
                phone_number,
                category_id: categoryModel?.id,
              });

              return resolve("item edited successfully");
            }
            await Item.create({
              name,
              category,
              price,
              images: imagePaths,
              description,
              location,
              user_id: session?.user?.id,
              phone_number,
              category_id: categoryModel?.id,
            });
            resolve("item created successfully");
          });
        });

        res.status(201).json({ message: response });
      } catch (error) {
        res.status(400).json({ message: error });
      }
      break;

    default:
      res
        .status(500)
        .json({ message: "SERVER DOES NOT  HANDLE THIS HTTP REQUEST" });
  }
}
