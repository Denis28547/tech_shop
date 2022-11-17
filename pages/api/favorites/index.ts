import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

import { Item, User } from "../../../models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const session = await unstable_getServerSession(req, res, authOptions);

        if (!session)
          return res.status(400).json({ message: "you are not logged in" });

        const user = await User.findByPk(session?.user?.id);

        if (!user)
          return res
            .status(500)
            .json({ message: "something unexpected happened" });

        const favoritesData = await user.getFavorite();

        res.status(200).json(favoritesData);
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
