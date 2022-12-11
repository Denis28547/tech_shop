import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IItem } from "../../types/index";

interface IGetSearchedItems {
  count: number;
  rows: IItem[] | [];
}

export const searchAPI = createApi({
  reducerPath: "searchAPI",
  tagTypes: ["SearchItems"],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: (build) => ({
    getSearchedItems: build.query<
      IGetSearchedItems,
      {
        searchText?: string;
        category?: string;
        priceFrom?: string;
        priceTo?: string;
      }
    >({
      query: ({ searchText, category, priceFrom, priceTo }) => ({
        url: "/api/search",
        params: { searchText, category, priceFrom, priceTo },
      }),
      providesTags: ["SearchItems"],
    }),
  }),
});

export const { useGetSearchedItemsQuery } = searchAPI;
