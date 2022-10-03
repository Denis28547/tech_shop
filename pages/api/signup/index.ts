import type { NextApiRequest, NextApiResponse } from "next";
import { Cart, User } from "../../../models";
const bcrypt = require("bcrypt");

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
        });

        const createdUser = user.toJSON();

        await Cart.create({ user_id: createdUser.id });

        res.status(201).json({ message: "successfully created" });
      } catch (error: any) {
        console.log(error);
        res.status(400).json(error);
      }
      break;

    default:
      res
        .status(500)
        .json({ message: "SERVER DOES NOT  HANDLE THIS HTTP REQUEST" });
  }
}
