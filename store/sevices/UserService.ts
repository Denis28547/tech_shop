import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: () => ({
        url: "/user",
      }),
    }),
  }),
});
