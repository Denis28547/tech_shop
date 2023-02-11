import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../models/index";

interface IReq {
  query: {
    [key: string]: string;
  };
}

export default async function handler(
  req: NextApiRequest & IReq,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const { user_id } = req.query;

        if (!user_id)
          return res.status(400).json({ message: "you are not signed in" });

        const userDB = await User.findByPk(user_id);

        if (!userDB) return res.status(400).json({ message: "no such user" });

        const { id, email, name, image } = userDB;

        const user = { id, email, name, image };

        res.status(200).json(user);
      } catch (error: any) {
        res.status(500).json({ message: "something unexpected happened" });
      }
      break;

    default:
      res
        .status(500)
        .json({ message: "SERVER DOES NOT  HANDLE THIS HTTP REQUEST" });
  }
}
