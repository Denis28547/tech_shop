const bcrypt = require("bcrypt");

// import db from "../../../utils/db";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { sequelize } from "../../../models/index.js";

export default async function handler(req, res) {
  const { method } = req;
  // await sequelize.sync();

  switch (method) {
    case "GET":
      try {
        // console.log(req);
        // console.log("-----------------------------------------------");
        const token = await getToken({ req });
        const session = await getSession({ req });
        // console.log(sequelize);
        // console.log(session);
        // console.log(token);
        // console.log("iat in :", Date(1664391993));
        // console.log("exp in :", Date(1666983993));
        // console.log("JSON Web Token", JSON.stringify(token, null, 2));
        res.send("end");
      } catch (error) {}
      break;

    default:
      res.status(500);
  }
}
