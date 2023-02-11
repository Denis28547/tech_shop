import type { NextApiRequest, NextApiResponse } from "next";

import { User } from "../../../models/index";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  type ReqType = {
    user_id: string;
    limit: string;
    excludeItemId?: string;
  };

  switch (method) {
    //get all items that user owns
    case "GET":
      try {
        const { user_id, limit, excludeItemId } = req.query as ReqType;

        const user = await User.findByPk(user_id);

        if (!user) return res.status(500).json({ message: "no user" });

        const itemsData = await user.getItems({
          limit: parseInt(limit),
          order: [["updatedAt", "DESC"]],
        });

        if (!itemsData)
          return res.status(400).json({ message: "No such item" });

        let result = itemsData;

        if (Array.isArray(itemsData) && itemsData.length && excludeItemId) {
          result = itemsData.filter((item) => {
            return item.id !== excludeItemId;
          });
        }

        res.status(200).json(result);
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
