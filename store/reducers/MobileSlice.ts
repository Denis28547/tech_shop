import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MobileState {
  isMobile: boolean;
}

const initialState: MobileState = {
  isMobile: false,
};

export const mobileSlice = createSlice({
  name: "mobile",
  initialState,
  reducers: {
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },
  },
});

export const { setIsMobile } = mobileSlice.actions;

export default mobileSlice.reducer;
