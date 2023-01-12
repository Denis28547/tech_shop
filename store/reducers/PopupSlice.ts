import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPopupState {
  text: string;
  isSuccess: boolean;
  secondsToShow: number;
  isOpen: boolean;
  opensCount: number;
  timerId: number | null;
}

const initialState: IPopupState = {
  text: "",
  isSuccess: true,
  secondsToShow: 2000,
  isOpen: false,
  opensCount: 0,
  timerId: null,
};

export const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    openPopupSuccess: (state, action: PayloadAction<string>) => {
      state.isSuccess = true;
      state.text = action.payload;
      state.isOpen = true;
      state.opensCount += 1;
    },
    openPopupFailure: (state, action: PayloadAction<string>) => {
      state.isSuccess = false;
      state.text = action.payload;
      state.isOpen = true;
      state.opensCount += 1;
    },
    setTimerId: (state, action: PayloadAction<number>) => {
      state.timerId = action.payload;
    },
    closePopup: (state) => {
      state.isOpen = false;
      state.opensCount = 0;
      state.timerId = null;
    },
  },
});

export const { closePopup, openPopupSuccess, openPopupFailure, setTimerId } =
  popupSlice.actions;

export default popupSlice.reducer;
