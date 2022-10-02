import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../models";
const bcrypt = require("bcrypt");

import db from "../../../utils/db";
import { getToken } from "next-auth/jwt";

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
          return res.json({ message: "Please enter all fields", status: 400 });

        const user = await User.findOne({ where: { email } });

        if (!user)
          return res.json({ message: "No user with such email", status: 400 });

        const isPassValid = await bcrypt.compareSync(
          password,
          user.password,
          Number(process.env.PASS_SALT)
        );

        if (!isPassValid)
          return res.json({ message: "Wrong password", status: 400 });

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
