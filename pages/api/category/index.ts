import type { NextApiRequest, NextApiResponse } from "next";

import { Category } from "../../../models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const categories = await Category.findAll();

        res.status(201).json(categories);
      } catch (error: any) {
        res.status(500).json({ message: "something unexpected happened" });
      }
      break;

    case "POST":
      try {
        const data = req.body;
        const { secretKey } = req.query;

        if (secretKey !== process.env.LAZY_ADMIN_SECRET_KEY)
          return res.status(400).json({ message: "you don't know the code" });

        if (!data)
          //! if role not admin, don't reply
          return res.status(400).json({ message: "no items" });

        await Category.bulkCreate(data);

        res.status(201).json({ message: "successfully created" });
      } catch (error: any) {
        res
          .status(500)
          .json({ message: "something unexpected happened", error });
      }
      break;

    default:
      res
        .status(500)
        .json({ message: "SERVER DOES NOT  HANDLE THIS HTTP REQUEST" });
  }
}
