const bcrypt = require("bcrypt");

// import db from "../../../utils/db";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
// import { User } from "../../../models/index.js";
import { models } from "@next-auth/sequelize-adapter";
import { Cart, User } from "../../../models";

export default async function handler(req, res) {
  const { method } = req;
  // await sequelize.sync();

  switch (method) {
    case "GET":
      try {
        // const user = await User.findOne({ //! GETTERS
        //   where: { id: "0ed31a69-942f-4ce8-a1d4-c0579d9eb287" },
        // });
        // if (!user) return res.send("NO USER WITH SUCH ID");
        // const cart = await user.getCart();
        // res.json(cart);
        // const cart = await Cart.findOne({
        //   where: { id: "439437bf-9f51-489f-a76f-bc047ee88a88" },
        // });
        // if (!cart) return res.send("NO CART WITH SUCH ID");
        // const user = await cart.getUser();
        // res.json(user);
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
