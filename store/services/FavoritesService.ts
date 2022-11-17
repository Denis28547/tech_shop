import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IItem } from "../redux_types";

export const favoritesAPI = createApi({
  reducerPath: "favoritesAPI",
  tagTypes: ["Favorites"],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: (build) => ({
    getFavoritesId: build.query<string[], void>({
      query: () => ({
        url: "/api/favoritesid",
      }),
      providesTags: ["Favorites"],
    }),
    getAllFavorites: build.query<IItem[], void>({
      query: () => ({
        url: "/api/favorites",
      }),
      providesTags: ["Favorites"],
    }),
    addFavorite: build.mutation<void, string>({
      query: (item_id) => ({
        url: `/api/favorites/${item_id}`,
        method: "POST",
      }),
      invalidatesTags: ["Favorites"],
    }),
    removeFavorite: build.mutation<void, string>({
      query: (item_id) => ({
        url: `/api/favorites/${item_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Favorites"],
    }),
  }),
});

export const {
  useGetFavoritesIdQuery,
  useGetAllFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} = favoritesAPI;
