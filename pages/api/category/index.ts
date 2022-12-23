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
        const { name } = req.body;
        //! if role not admin, don't reply
        if (!name)
          return res
            .status(400)
            .json({ message: "you didn't provide category name" });

        await Category.create({ name });
        // await Category.bulkCreate([{ name: "biba" }, { name: "boba" }]); make bulkcreate

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
