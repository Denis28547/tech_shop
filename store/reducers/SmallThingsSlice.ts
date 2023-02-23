import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISmallThingsSlice {
  isMobile: boolean;
  isAuthModalOpen: boolean;
  theme: "light" | "dark";
}

const initialState: ISmallThingsSlice = {
  isMobile: false,
  isAuthModalOpen: false,
  theme: "light",
};

export const smallThingsSlice = createSlice({
  name: "smallThings",
  initialState,
  reducers: {
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },
    setIsAuthModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isAuthModalOpen = action.payload;
    },
    changeTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
  },
});

export const { setIsMobile, setIsAuthModalOpen, changeTheme } =
  smallThingsSlice.actions;

export default smallThingsSlice.reducer;
