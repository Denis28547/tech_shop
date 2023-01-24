import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IModalState {
  toDeleteItemId: string;
  isModalOpen: boolean;
}

const initialState: IModalState = {
  toDeleteItemId: "",
  isModalOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string>) => {
      state.toDeleteItemId = action.payload;
      state.isModalOpen = true;
    },
    closeModal: () => initialState,
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
