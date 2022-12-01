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
    case "GET":
      try {
        const { item_id } = req.query;
        // console.log(typeof item_id);

        if (typeof item_id !== "string")
          return res
            .status(500)
            .json({ message: "something unexpected happened" });

        // const session = await unstable_getServerSession(req, res, authOptions);

        // if (!session)
        //   return res.status(400).json({ message: "you are not logged in" });

        // const user = await User.findByPk(session?.user?.id);
        const item = await Item.findOne({
          //!DOESNT WORK PROPERLY, DOES NOT FIND CORRECT USER
          where: { id: item_id },
          include: {
            model: User,
          },
        });
        // if (!user || !item)
        //   return res
        //     .status(500)
        //     .json({ message: "something unexpected happened" });
        if (!item)
          return res
            .status(500)
            .json({ message: "something unexpected happened" });

        res.status(200).json(item);
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
