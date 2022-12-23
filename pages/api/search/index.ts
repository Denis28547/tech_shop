import type { NextApiRequest, NextApiResponse } from "next";
import { Op } from "sequelize";

import { Category, Item } from "../../../models";

interface IReq {
  query: {
    [key: string]: string;
  };
}

export default async function handler(
  req: NextApiRequest & IReq,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    //finds all items with search params, category is an id
    case "GET":
      try {
        const {
          searchText,
          category, //here will be name of the category
          priceFrom = "0",
          priceTo = "9999999",
          sortBy = undefined,
        } = req.query;

        const whereStatement: any = {
          price: { [Op.between]: [priceFrom, priceTo] },
        };
        if (searchText)
          whereStatement.name = { [Op.iLike]: "%" + searchText + "%" };
        if (category) {
          const categoryData = await Category.findOne({
            //finding id of the category
            where: { name: category },
          });
          if (!categoryData) return;
          whereStatement.category_id = categoryData.id;
        }

        let sortByStatement: any = undefined;

        switch (sortBy) {
          case "name":
            sortByStatement = [["name", "ASC"]];
            break;
          case "newest":
            sortByStatement = [["createdAt", "DESC"]];
            break;
          case "priceLow":
            sortByStatement = [["price", "ASC"]];
            break;
          case "priceHigh":
            sortByStatement = [["price", "DESC"]];
            break;
        }

        const searchedItems = await Item.findAndCountAll({
          where: whereStatement,
          include: {
            model: Category,
          },
          order: sortByStatement,
        });

        res.status(200).json(searchedItems);
      } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: "something unexpected happened" });
      }
      break;

    default:
      res
        .status(500)
        .json({ message: "SERVER DOES NOT HANDLE THIS HTTP REQUEST" });
  }
}
