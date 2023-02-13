import type { NextApiRequest, NextApiResponse } from "next";
import { getFileStream } from "../../../utils/s3";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const { image_key } = req.query;

        if (typeof image_key !== "string")
          return res.status(400).send("wrong key of image");

        const readStream = getFileStream(image_key);

        readStream.pipe(res);
      } catch (error: any) {
        return res
          .status(500)
          .json({ message: "something unexpected happened" });
      }
      break;

    case "DELETE":
      try {
      } catch (error: any) {
        res.status(400).json({ message: error.message });
      }
      break;

    default:
      res
        .status(500)
        .json({ message: "SERVER DOES NOT  HANDLE THIS HTTP REQUEST" });
  }
}
