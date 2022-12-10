import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IItem } from "../../types/index";

export const searchAPI = createApi({
  reducerPath: "searchAPI",
  tagTypes: ["SearchItems"],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: (build) => ({
    getSearchedItems: build.query<
      IItem[] | [],
      {
        searchText: string;
        category?: string;
        priceFrom?: string;
        priceTo?: string;
      }
    >({
      query: ({ searchText, category, priceFrom, priceTo }) => ({
        url: `/api/search/${searchText}?category=${
          category ? category : ""
        }&pricefrom=${priceFrom ? priceFrom : ""}&priceto=${
          priceTo ? priceTo : ""
        }`,
      }),
      providesTags: ["SearchItems"],
    }),
  }),
});

export const { useGetSearchedItemsQuery } = searchAPI;
