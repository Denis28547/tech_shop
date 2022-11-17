import { configureStore } from "@reduxjs/toolkit";

import { userAPI } from "./services/UserService";
import { itemAPI } from "./services/ItemService";
import { favoritesAPI } from "./services/FavoritesService";

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [itemAPI.reducerPath]: itemAPI.reducer,
    [favoritesAPI.reducerPath]: favoritesAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      userAPI.middleware,
      itemAPI.middleware,
      favoritesAPI.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
