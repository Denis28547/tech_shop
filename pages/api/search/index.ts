import type { NextApiRequest, NextApiResponse } from "next";
import { Op } from "sequelize";

import { Category, Item } from "../../../models";

interface IReq {
  query: {
    [key: string]: string;
  };
}

const checkIfExists = (query: string): boolean => {
  if (query.length > 0) return true;
  return false;
};

const removeEmptyQuery = (queryArr: { [key: string]: string }) => {
  for (const query in queryArr) {
    if (!checkIfExists(queryArr[query])) {
      delete queryArr[query];
    }
  }
  return queryArr;
};

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

        const searchedItems = await Item.findAndCountAll({
          where: whereStatement,
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
