import type { NextApiRequest, NextApiResponse } from "next";

import { User } from "../../../models";

import { sendActivationMail } from "../../../server/mailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const { activationLink } = req.query;
        console.log(req.query);
        const user = await User.findOne({ where: { activationLink } });

        if (!user) return res.status(400).json({ message: "no user" });

        if (user.isActivated)
          return res
            .status(400)
            .json({ message: "account is already activated" });

        user.isActivated = true;
        user.save();
        res.status(200).json({ message: "you successfully activated account" });
      } catch (error: any) {}
      break;

    // case "GET":
    //   try {
    //     sendActivationMail();
    //     res.send("send");
    //   } catch (error) {
    //     console.log(error);
    //   }
    //   break;

    default:
      res
        .status(500)
        .json({ message: "SERVER DOES NOT  HANDLE THIS HTTP REQUEST" });
  }
}
