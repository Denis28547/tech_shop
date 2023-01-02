import { HYDRATE } from "next-redux-wrapper";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IItem } from "../../types/index";

export const favoritesAPI = createApi({
  reducerPath: "favoritesAPI",
  tagTypes: ["Favorites"],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    getAllUserFavoritesIds: build.query<string[], void>({
      query: () => ({
        url: "/api/favoritesIds",
      }),
      providesTags: ["Favorites"],
    }),
    getAllFavorites: build.query<IItem[], void>({
      query: () => ({
        url: "/api/favorites",
      }),
      providesTags: ["Favorites"],
    }),
    removeAllFavorites: build.mutation<void, void>({
      query: () => ({
        url: "/api/favorites",
        method: "DELETE",
      }),
      invalidatesTags: ["Favorites"],
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
  useGetAllUserFavoritesIdsQuery,
  useGetAllFavoritesQuery,
  useRemoveAllFavoritesMutation,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} = favoritesAPI;

export const { getAllUserFavoritesIds } = favoritesAPI.endpoints;
