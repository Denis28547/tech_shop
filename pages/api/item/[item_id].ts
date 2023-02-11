import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

import { User, Item, Category } from "../../../models/index";

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
          include: [
            {
              model: User,
              attributes: ["id", "image", "name", "createdAt"],
              // attributes: ["id", "image", "name", "createdAt", "rating"], need to add rating functionality
            },
            {
              model: Category,
              attributes: ["id", "name"],
            },
          ],
        });

        if (!item) return res.status(400).json({ message: "No such item" });

        res.status(200).json(item);
      } catch (error: any) {
        return res
          .status(500)
          .json({ message: "something unexpected happened" });
      }
      break;

    case "DELETE":
      try {
        const { item_id } = req.query;
        const session = await unstable_getServerSession(req, res, authOptions);

        if (!session || !session.user)
          return res.status(401).json({ message: "not authenticated" });

        if (!item_id || typeof item_id !== "string")
          return res.status(400).json({
            message:
              "either item item_id was not included or it's type was not string",
          });

        const itemToDelete = await Item.findOne({ where: { id: item_id } });

        if (!itemToDelete)
          return res.status(400).json({
            message: "no item with such item_id for deletion",
          });

        if (itemToDelete.user_id !== session.user.id)
          return res.status(400).json({
            message: "you don't have the permission to delete this item",
          });

        await Item.destroy({
          where: {
            id: item_id,
          },
          force: true,
        });

        res.status(200).json({ message: "deleted item successfully" });
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
