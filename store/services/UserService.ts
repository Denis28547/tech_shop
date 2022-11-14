import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IUser } from "../redux_types";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: (build) => ({
    getUserById: build.query<IUser, string>({
      query: (id) => ({
        url: `/api/user/${id}`,
      }),
    }),
    // addItem: build.mutation({
    //   query: (body) => ({
    //     url: "/api/item",
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: [{ type: "Items", id: "LIST" }],
    // }),
  }),
});

export const { useGetUserByIdQuery } = userAPI;
