import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IItem, IItemWithUser } from "../redux_types";

export const itemAPI = createApi({
  reducerPath: "itemAPI",
  tagTypes: ["Items"],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: (build) => ({
    getAllItems: build.query<IItem[], number>({
      query: (limit) => ({
        url: `/api/item?limit=${limit}`,
      }),
      providesTags: ["Items"],
    }),
    getItemByIdWithUser: build.query<IItemWithUser, string | string[]>({
      query: (item_id) => ({
        url: `api/item/${item_id}`,
      }),
      providesTags: ["Items"],
    }),
    addItem: build.mutation({
      query: (body) => ({
        url: "/api/item",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Items"],
    }),
  }),
});

export const {
  useGetAllItemsQuery,
  useGetItemByIdWithUserQuery,
  useAddItemMutation,
} = itemAPI;
