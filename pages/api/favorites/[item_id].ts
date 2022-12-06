import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

import { User, Item } from "../../../models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const { item_id } = req.query;

        if (typeof item_id !== "string")
          return res.status(500).json({ message: "wrong type of id" });

        const session = await unstable_getServerSession(req, res, authOptions);

        if (!session)
          return res.status(400).json({ message: "you are not logged in" });

        const user = await User.findByPk(session?.user?.id);
        const item = await Item.findByPk(item_id);
        if (!user || !item)
          return res.status(500).json({ message: "no user or item" });

        await user.addFavorite(item);

        res.status(200).json({ message: "item added to favorites" });
      } catch (error: any) {
        return res
          .status(500)
          .json({ message: "something unexpected happened" });
      }
      break;

    case "DELETE":
      try {
        const { item_id } = req.query;

        if (typeof item_id !== "string")
          return res
            .status(500)
            .json({ message: "something unexpected happened" });

        const session = await unstable_getServerSession(req, res, authOptions);

        if (!session)
          return res.status(400).json({ message: "you are not logged in" });

        const user = await User.findByPk(session?.user?.id);
        const item = await Item.findByPk(item_id);
        if (!user || !item)
          return res
            .status(500)
            .json({ message: "something unexpected happened" });

        await user.removeFavorite(item);

        res.status(200).json({ message: "item deleted from favorites" });
      } catch (error: any) {
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
