import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { File, Files, IncomingForm } from "formidable";
const path = require("path");

import { Item } from "../../../models";

import { IItem } from "../../../models/models_type";
import PersistentFile from "formidable/PersistentFile";

export const config = {
  api: {
    bodyParser: false,
  },
};

const checkFileType = (file: File): boolean => {
  if (file.originalFilename) {
    let fileType = file.originalFilename.split(".").at(-1) as string;
    fileType = "svg";
    const validTypes = ["png", "jpg", "jpeg"];
    if (validTypes.includes(fileType)) return true;
    return false;
  }
  return false;
};

const saveFile = (file: File): string => {
  if (file.originalFilename) {
    const fileType = file.originalFilename.split(".").at(-1);
    const fileName = uuidv4() + "." + fileType;
    const data = fs.readFileSync(file.filepath);
    fs.writeFileSync(`./public/itemImages/${fileName}`, data);
    // await fs.unlinkSync(file.filepath);
    return fileName;
  } else {
    return "sjksj";
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const form = new IncomingForm({
          multiples: true,
          maxFileSize: 50 * 1024 * 1024,
        });

        form.parse(req, async (err, fields, files) => {
          if (err)
            res.status(500).json({
              message: "something unexpected happened while working with file",
            });

          let imagePaths: string[] = [];

          interface addFile {
            filepath: string;
            originalFilename: string;
          }

          const { images }: Files = files;

          if (Array.isArray(images)) {
            images.forEach(async (image) => {
              const isValid = checkFileType(image);
              console.log(isValid);
              const imagePath = saveFile(image);
              imagePaths.push(imagePath);
            });
          } else {
            await saveFile(images);
          }
        });

        res.status(400).json({ message: "successfully added item" });
      } catch (error: any) {
        console.log(error);
        return res
          .status(500)
          .json({ message: "something unexpected happened" });
      }
      break;

    default:
      res
        .status(500)
        .json({ message: "SERVER DOES NOT  HANDLE THIS HTTP REQUEST" });
  }
}
