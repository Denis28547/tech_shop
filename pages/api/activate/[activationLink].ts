import type { NextApiRequest, NextApiResponse } from "next";

import { User } from "../../../models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "PUT":
      try {
        const { activationLink } = req.query;
        const user = await User.findOne({ where: { activationLink } });

        if (!user) return res.status(400).json({ message: "no user" });

        if (user.isActivated)
          return res
            .status(400)
            .json({ message: "account is already activated" });

        // user.isActivated = true;
        await user.save();

        res.status(200).json({ message: "account is successfully activated" });
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
