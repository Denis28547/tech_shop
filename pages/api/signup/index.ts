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
        const { username, email, password } = req.body;

        if (!username || !email || !password)
          return res.json({ message: "Please enter all fields" });

        if (password.length < 6)
          return res.json({
            message: "Password length should be at least 6 characters",
          });

        const ifUserExists = await db.query(
          `SELECT * FROM "user" WHERE "user".email = $1`,
          [email]
        );

        if (ifUserExists.rows.length)
          return res.json({ message: "user already exists" });

        const hashedPass = await bcrypt.hash(
          password,
          Number(process.env.PASS_SALT)
        );

        const createdUser = await db.query(
          `INSERT INTO "user" (username, email, password) VALUES ($1, $2, $3) RETURNING *`,
          [username, email, hashedPass]
        );

        await db.query(`INSERT INTO "cart" (user_id) VALUES ($1)`, [
          createdUser.rows[0].id,
        ]);

        res.status(201).json({ message: "successfully created" });
      } catch (error: any) {
        res.status(400).json(error);
      }
      break;

    default:
      res.status(500);
  }
}
