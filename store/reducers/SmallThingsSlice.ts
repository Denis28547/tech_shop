import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISmallThingsSlice {
  isMobile: boolean;
  isAuthModalOpen: boolean;
}

const initialState: ISmallThingsSlice = {
  isMobile: false,
  isAuthModalOpen: false,
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
  },
});

export const { setIsMobile, setIsAuthModalOpen } = smallThingsSlice.actions;

export default smallThingsSlice.reducer;
