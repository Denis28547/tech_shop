import type { NextApiRequest, NextApiResponse } from "next";
const bcrypt = require("bcrypt");

import db from "../../../utils/db";

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
          return res.json({ message: "Please enter all fields" });

        const user = await db.query(
          `SELECT * FROM "user" WHERE "user".email = $1`,
          [email]
        );

        if (!user.rows.length)
          return res.json({ message: "No user with such email" });

        const isPassValid = await bcrypt.compareSync(
          password,
          user.rows[0].password,
          Number(process.env.PASS_SALT)
        );

        if (!isPassValid) return res.json({ message: "Password is incorrect" });

        res.status(201).json({ message: "successfully loginned" });
      } catch (error: any) {
        res.status(400).json(error);
      }
      break;

    default:
      res.status(500);
  }
}
