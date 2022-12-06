import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";

import { User } from "../../../models";
import { IItem } from "../../../models/models_type";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  interface IReq {
    user_id: string;
    limit: string | undefined;
    excludeItemId: string | undefined;
  }

  switch (method) {
    case "GET":
      try {
        // const { user_id } = req.query;

        // const {
        //   user_id,
        //   limit = undefined,
        //   excludeItemId = undefined,
        // } = req.query;

        const params = req.query.id as IReq;

        //if not limit provided = undefined
        // const excludeItemId = "";

        // if (typeof user_id !== "string")
        //   return res.status(500).json({ message: "wrong id type" });
        // excludeItemId: string | null

        if (typeof user_id !== "string")
          return res.status(500).json({ message: "wrong id type" });

        const user = await User.findByPk(user_id);

        if (!user) return res.status(500).json({ message: "no user" });

        const itemsData = await user?.getItems({ limit: parseInt(limit) });

        if (!itemsData)
          return res.status(400).json({ message: "No such item" });

        if (itemsData.length < 2) return res.status(400).json([]);

        let result;

        // if(Array.isArray(itemsData)){
        //   items = itemsData as IItem
        //   result = itemsData.filter((item) => item.id !== excludeItemId)
        // }

        // if (itemsData.length) {
        //   const items = itemsData as IItem[];
        //   result = items.filter((item) => item.id !== excludeItemId);
        // }
        // if (itemsData.id) {
        // } else {
        // }

        // const result = items.filter((item) => {
        //   console.log("excludeItemId", excludeItemId);
        //   console.log(item.id);
        //   return item.id !== excludeItemId;
        // });

        res.status(200).json(itemsData);
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
