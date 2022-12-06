import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { File, Files, IncomingForm } from "formidable";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

import { Item, Category } from "../../../models";
import { IItem } from "../../../models/models_type";

export const config = {
  api: {
    bodyParser: false,
  },
};

const checkFileType = (file: File): boolean => {
  if (file.originalFilename) {
    let fileType = file.originalFilename.split(".").at(-1) as string;
    const validTypes = ["png", "jpg", "jpeg"];
    if (validTypes.includes(fileType)) return true;
    return false;
  }
  return false;
};

const saveFile = (file: File): string => {
  const fileType = file.originalFilename!.split(".").at(-1);
  const fileName = uuidv4() + "." + fileType;
  const data = fs.readFileSync(file.filepath);
  fs.writeFileSync(`./public/Content/${fileName}`, data);
  return fileName;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
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

    case "POST":
      try {
        const response = await new Promise((resolve, reject) => {
          const form = new IncomingForm({
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

            if (!session) reject("please log in to sell an item");

            const { name, category, price, description, location, number } =
              fields;

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

            let imagePaths: string[] = [];

            const { images }: Files = files;

            if (Array.isArray(images)) {
              for (let index = 0; index < images.length; index++) {
                const image = images[index];
                const isValid = checkFileType(image);
                if (!isValid) {
                  return reject("invalid file type");
                }
                const imagePath = saveFile(image);
                imagePaths.push(imagePath);
              }
            } else {
              const isValid = checkFileType(images);
              if (!isValid) {
                return reject("invalid file type");
              }
              const imagePath = saveFile(images);
              imagePaths.push(imagePath);
            }

            const categoryModel = await Category.findOne({
              where: { name: category },
            });

            if (!categoryModel) reject("something unexpected happened");

            await Item.create<IItem>({
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
