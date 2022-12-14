import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PopupState {
  currencyFrom: string;
  currencyTo: string;
  category: { id: string; name: string };
  queryArr: { [key: string]: string };
}

const initialState: PopupState = {
  currencyFrom: "",
  currencyTo: "",
  category: { id: "", name: "" },
  queryArr: { from: "", to: "", category: "" },
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateCurrencyFrom: (state, action: PayloadAction<string>) => {
      state.currencyFrom = action.payload;
      state.queryArr.from = action.payload;
    },
    updateCurrencyTo: (state, action: PayloadAction<string>) => {
      state.currencyTo = action.payload;
      state.queryArr.to = action.payload;
    },
    updateCategoryId: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      state.category = action.payload;
      state.queryArr.category = action.payload.name;
    },
    clearAllFilters: (state) => {
      state = initialState;
    },
  },
});

export const {
  updateCurrencyFrom,
  updateCurrencyTo,
  updateCategoryId,
  clearAllFilters,
} = searchSlice.actions;

export default searchSlice.reducer;
