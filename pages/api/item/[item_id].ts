import type { NextApiRequest, NextApiResponse } from "next";

import { User, Item } from "../../../models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const { item_id } = req.query;

        if (typeof item_id !== "string")
          return res.status(500).json({ message: "wrong id type" });

        const item = await Item.findOne({
          where: { id: item_id },
          include: {
            model: User,
          },
        });

        if (!item) return res.status(400).json({ message: "No such item" });

        res.status(200).json(item);
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
