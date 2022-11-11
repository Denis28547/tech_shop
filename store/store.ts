import { configureStore } from "@reduxjs/toolkit";

import { userAPI } from "./services/UserService";
import { itemAPI } from "./services/ItemService";

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [itemAPI.reducerPath]: itemAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([userAPI.middleware, itemAPI.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
