const bcrypt = require("bcrypt");

// import db from "../../../utils/db";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
// import { User } from "../../../models/index.js";
import { models } from "@next-auth/sequelize-adapter";

export default async function handler(req, res) {
  const { method } = req;
  // await sequelize.sync();

  switch (method) {
    case "GET":
      try {
        const token = await getToken({ req });
        const session = await getSession({ req });
        console.log(token);
        res.send("here");
      } catch (error) {
        console.log(error);
        res.json(error);
      }
      break;

    case "POST":
      try {
        const { username, email, password } = req.body;
        // const user = await User.create({
        //   username,
        //   email,
        //   password,
        // });
        // res.send("created").json(user);
      } catch (error) {
        res.json(error);
      }
      break;

    default:
      res.status(500);
  }
}
