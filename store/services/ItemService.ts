import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IItem } from "../redux_types";

interface rtxResponse {
  message: string;
}

export const itemAPI = createApi({
  reducerPath: "itemAPI",
  tagTypes: ["Items"],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: (build) => ({
    getAllItems: build.query<IItem[], void>({
      query: () => ({
        url: "/api/item",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Items" as const, id })),
              { type: "Items", id: "LIST" },
            ]
          : [{ type: "Items", id: "LIST" }],
    }),
    addItem: build.mutation({
      query: (body) => ({
        url: "/api/item",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Items", id: "LIST" }],
    }),
  }),
});

export const { useGetAllItemsQuery, useAddItemMutation } = itemAPI;
