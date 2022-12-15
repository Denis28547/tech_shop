import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PopupState {
  currencyFrom: string;
  currencyTo: string;
  category: string;
}

const initialState: PopupState = {
  currencyFrom: "",
  currencyTo: "",
  category: "",
};
//persist info if url already includes something
export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateCurrencyFrom: (state, action: PayloadAction<string>) => {
      state.currencyFrom = action.payload;
    },
    updateCurrencyTo: (state, action: PayloadAction<string>) => {
      state.currencyTo = action.payload;
    },
    updateCategoryId: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    clearAllFilters: () => initialState,
    clearOneFilter: (state, action: PayloadAction<keyof PopupState>) => {
      state[action.payload] = "";
    },
  },
});

export const {
  updateCurrencyFrom,
  updateCurrencyTo,
  updateCategoryId,
  clearAllFilters,
  clearOneFilter,
} = searchSlice.actions;

export default searchSlice.reducer;
