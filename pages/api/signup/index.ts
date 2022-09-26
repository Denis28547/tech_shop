import type { NextApiRequest, NextApiResponse } from "next";

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

        const ifUserExists = await db.query(
          `SELECT * FROM "user" WHERE "user".email = $1`,
          [email]
        );

        if (!username || !email || !password)
          return res.json({ message: "Please enter all fields" });

        if (password.length < 6)
          return res.json({
            message: "Password length should be at least 6 characters",
          });

        if (ifUserExists.rows.length)
          return res.json({ message: "user already exists" });

        await db.query(
          `INSERT INTO "user" (username, email, password) VALUES ($1, $2, $3)`,
          [username, email, password]
        );

        res.status(201).json({ message: "successfully created" });
      } catch (error: any) {
        // console.log(error);
        res.status(400).json(error);
      }
      break;

    default:
      res.status(500);
  }
}
