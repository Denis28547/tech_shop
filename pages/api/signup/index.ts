import type { NextApiRequest, NextApiResponse } from "next";
const bcrypt = require("bcrypt");
import { v4 as uuidv4 } from "uuid";
import { sendActivationMail } from "../../../server/mailer";

import { User } from "../../../models/index";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const { name, email, password } = req.body;

        if (!name || !email || !password)
          return res.status(400).json({ message: "Please enter all fields" });

        if (password.length < 6)
          return res.status(400).json({
            message: "Password length should be at least 6 characters",
          });

        const candidate = await User.findOne({ where: { email } });

        if (candidate)
          return res.status(400).json({ message: "user already exists" });

        const hashedPass = await bcrypt.hash(
          password,
          Number(process.env.PASS_SALT)
        );

        const user = await User.create({
          name,
          email,
          password: hashedPass,
          activationLink: uuidv4(),
          isActivated: false,
        });

        const activationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/activate/${user.activationLink}`;

        sendActivationMail(user.email, activationUrl);

        res.status(201).json({ message: "your account has been created" });
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
