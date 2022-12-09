import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PopupState {
  text: string;
  isSuccess: boolean;
  secondsToShow: number;
  isOpen: boolean;
}

const initialState: PopupState = {
  text: "",
  isSuccess: true,
  secondsToShow: 2000,
  isOpen: false,
};

export const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    openPopup: (state) => {
      state.isOpen = true;
    },
    closePopup: (state) => {
      state.isOpen = false;
    },
    setSuccessText: (state, action: PayloadAction<string>) => {
      state.isSuccess = true;
      state.text = action.payload;
      state.isOpen = true;
    },
    setFailedText: (state, action: PayloadAction<string>) => {
      state.isSuccess = false;
      state.text = action.payload;
      state.isOpen = true;
    },
  },
});

export const { openPopup, closePopup, setSuccessText, setFailedText } =
  popupSlice.actions;

export default popupSlice.reducer;
