const bcrypt = require("bcrypt");

// import db from "../../../utils/db";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { sequelize } from "../../../models/index.js";
// import { User } from "../../../models/index.js";
import { models } from "@next-auth/sequelize-adapter";

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
        console.log(Date(1664565739));
        sequelize.sync();
        console.log("1111111111111111111111");
        const user = await sequelize.User.findAll();

        console.log("-----------------------------------------------");
        console.log({
          key: user,
        });
        res.json(user);
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
