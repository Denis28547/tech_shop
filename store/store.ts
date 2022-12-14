import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import popupReducer from "./reducers/PopupSlice";
import mobileReducer from "./reducers/MobileSlice";
import searchReducer from "./reducers/SearchSlice";
import sideBarReducer from "./reducers/SidebarSlice";

import { itemAPI } from "./services/ItemService";
import { favoritesAPI } from "./services/FavoritesService";
import { searchAPI } from "./services/SearchService";
import { categoryAPI } from "./services/CategoryService";

// export const store = configureStore({
//   reducer: {
//     popup: popupReducer,
//     mobile: mobileReducer,
//     [itemAPI.reducerPath]: itemAPI.reducer,
//     [favoritesAPI.reducerPath]: favoritesAPI.reducer,
//     [searchAPI.reducerPath]: searchAPI.reducer,
//   },

// middleware: (getDefaultMiddleware) =>
//   getDefaultMiddleware().concat([
//     itemAPI.middleware,
//     favoritesAPI.middleware,
//     searchAPI.middleware,
//   ]),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

const makeStore = () =>
  configureStore({
    reducer: {
      popup: popupReducer,
      mobile: mobileReducer,
      search: searchReducer,
      sidebars: sideBarReducer,
      [itemAPI.reducerPath]: itemAPI.reducer,
      [favoritesAPI.reducerPath]: favoritesAPI.reducer,
      [searchAPI.reducerPath]: searchAPI.reducer,
      [categoryAPI.reducerPath]: categoryAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        itemAPI.middleware,
        favoritesAPI.middleware,
        searchAPI.middleware,
        categoryAPI.middleware,
      ]),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore);
// export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
export const store = makeStore();
