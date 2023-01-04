import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

import { IItemWithCategory } from "../../types/index";

export interface IGetSearchedItems {
  count: number;
  rows: IItemWithCategory[] | [];
}

export const searchAPI = createApi({
  reducerPath: "searchAPI",
  tagTypes: ["SearchItems"],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    getSearchedItems: build.query<
      IGetSearchedItems,
      {
        searchText?: string;
        category?: string;
        priceFrom?: string;
        priceTo?: string;
        sortBy?: string;
        limit?: string;
        offset?: number;
      }
    >({
      query: ({
        searchText,
        category,
        priceFrom,
        priceTo,
        sortBy,
        limit,
        offset,
      }) => ({
        url: "/api/search",
        params: {
          searchText,
          category,
          priceFrom,
          priceTo,
          sortBy,
          limit,
          offset,
        },
      }),
      providesTags: ["SearchItems"],
    }),
  }),
});

export const { useGetSearchedItemsQuery } = searchAPI;

export const { getSearchedItems } = searchAPI.endpoints;
