import type { NextApiRequest, NextApiResponse } from "next";
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

        const user = await db.query(
          `SELECT * FROM "user" WHERE "user".email = $1`,
          [email]
        );

        if (!user.rows.length)
          return res.json({ message: "No user with such email", status: 400 });

        const isPassValid = await bcrypt.compareSync(
          password,
          user.rows[0].password,
          Number(process.env.PASS_SALT)
        );

        if (!isPassValid)
          return res.json({ message: "Wrong password", status: 400 });

        res.status(200).json(user.rows[0]);
      } catch (error: any) {
        res.status(400).json(error);
      }
      break;

    default:
      res.status(500);
  }
}
