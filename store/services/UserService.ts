import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IUser } from "../redux_types";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: (builder) => ({
    getUserById: builder.query<IUser, string>({
      query: (id) => ({
        url: `/api/user/${id}`,
      }),
    }),
  }),
});

export const { useGetUserByIdQuery } = userAPI;
