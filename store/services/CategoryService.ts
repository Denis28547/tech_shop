import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { ICategory } from "../../types/index";

export interface IGetSearchedItems {}

export const categoryAPI = createApi({
  reducerPath: "categoryAPI",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    getAllCategories: build.query<ICategory[], void>({
      query: () => ({
        url: "/api/category",
      }),
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoryAPI;

export const { getAllCategories } = categoryAPI.endpoints;
