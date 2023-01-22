import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

import { IItem, IItemWithUser } from "../../types/index";

export const itemAPI = createApi({
  reducerPath: "itemAPI",
  tagTypes: ["Items"],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    getAllItems: build.query<IItem[], number>({
      query: (limit) => ({
        url: `/api/item?limit=${limit}`,
      }),
      providesTags: ["Items"],
    }),
    getItemByIdWithUser: build.query<IItemWithUser, string | string[]>({
      query: (item_id) => ({
        url: `/api/item/${item_id}`,
      }),
      providesTags: ["Items"],
    }),
    getAllUserItems: build.query<
      // sorts by updatedAt DESC
      IItem[] | [],
      {
        user_id?: string;
        limit?: number;
        excludeItemId?: string;
      }
    >({
      query: ({ user_id, limit = 8, excludeItemId }) => ({
        url: `/api/allUserItems/${user_id}`,
        params: { user_id, limit, excludeItemId },
      }),
      providesTags: ["Items"],
    }),

    addItem: build.mutation<any, { item_id?: string; body: any }>({
      query: ({ item_id, body }) => ({
        url: `/api/item`,
        method: "POST",
        params: { item_id },
        body,
      }),
      invalidatesTags: ["Items"],
    }),
    editItem: build.mutation<any, { item_id?: string; body: any }>({
      query: ({ item_id, body }) => ({
        url: "/api/item",
        method: "PUT",
        params: { item_id },
        body,
      }),
      invalidatesTags: ["Items"],
    }),
    deleteItem: build.mutation<void, string>({
      query: (item_id) => ({
        url: `/api/item/${item_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Items"],
    }),
  }),
});

export const {
  useGetAllItemsQuery,
  useGetItemByIdWithUserQuery,
  useGetAllUserItemsQuery,
  useAddItemMutation,
  useEditItemMutation,
  useDeleteItemMutation,
  util: { getRunningOperationPromises },
} = itemAPI;

// export endpoints for use in SSR
export const { getAllItems, getItemByIdWithUser, getAllUserItems } =
  itemAPI.endpoints;
