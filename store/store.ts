import { configureStore } from "@reduxjs/toolkit";

import popupReducer from "./reducers/PopupSlice";
import mobileReducer from "./reducers/MobileSlice";
import { itemAPI } from "./services/ItemService";
import { favoritesAPI } from "./services/FavoritesService";

export const store = configureStore({
  reducer: {
    popup: popupReducer,
    mobile: mobileReducer,
    [itemAPI.reducerPath]: itemAPI.reducer,
    [favoritesAPI.reducerPath]: favoritesAPI.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      itemAPI.middleware,
      favoritesAPI.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
