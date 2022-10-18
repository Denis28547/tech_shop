import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../models";
const bcrypt = require("bcrypt");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const { email, password } = req.body;

        if (!email || !password)
          return res.status(400).json({ message: "Please enter all fields" });

        const user = await User.findOne({ where: { email } });

        if (!user)
          return res.status(400).json({ message: "No user with such email" });

        const isPassValid = await bcrypt.compareSync(
          password,
          user.password,
          Number(process.env.PASS_SALT)
        );

        if (!isPassValid)
          return res.status(400).json({ message: "Wrong password" });

        res.status(200).json(user);
      } catch (error: any) {
        res.status(400).json(error);
      }
      break;

    default:
      res
        .status(500)
        .json({ message: "SERVER DOES NOT  HANDLE THIS HTTP REQUEST" });
  }
}
