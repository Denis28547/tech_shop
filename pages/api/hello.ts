// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import db from "../../utils/db";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const newUser = await db.query(
    `INSERT INTO "user" (username, email, password) VALUES ($1, $2, $3)`,
    ["user4", "email4@gmail.com", "hashpass4"],
    (error: any, results: any) => {
      console.log(
        "----------------------------------------------------------------"
      );
      console.log(error?.detail);
    }
  );

  // console.log(
  //   "----------------------------------------------------------------"
  // );
  // console.log(newUser);
  res.status(200).json(newUser);
}
