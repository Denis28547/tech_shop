const bcrypt = require("bcrypt");

import db from "../../../utils/db";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        console.log(req);
        console.log("-----------------------------------------------");

        const token = await getToken({ req });
        console.log(token);
        console.log("iat in :", Date(1664391993));
        console.log("exp in :", Date(1666983993));
        console.log("JSON Web Token", JSON.stringify(token, null, 2));
        res.send("end");
      } catch (error) {}
      break;

    default:
      res.status(500);
  }
}
