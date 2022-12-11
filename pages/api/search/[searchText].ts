import type { NextApiRequest, NextApiResponse } from "next";

import { Item } from "../../../models";

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
    case "GET":
      try {
        const queryArr = removeEmptyQuery(req.query);
        const { searchText, category, priceFrom, priceTo } = queryArr;

        const searchedItems = await Item.findAll({
          // where: { name: searchText, price:  },
        });
        console.log(searchedItems);
        // const searchedItems = await Item.findAndCountAll({});

        res.status(200).json(searchedItems);
      } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: "something unexpected happened" });
      }
      break;

    default:
      res
        .status(500)
        .json({ message: "SERVER DOES NOT  HANDLE THIS HTTP REQUEST" });
  }
}
