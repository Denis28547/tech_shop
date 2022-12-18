import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISearchState {
  from: string;
  to: string;
  category: string;
}

const initialState: ISearchState = {
  from: "",
  to: "",
  category: "",
};
//persist info if url already includes something
export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updatePricesState: (
      state,
      action: PayloadAction<{ from: string; to: string }>
    ) => {
      state.from = action.payload.from;
      state.to = action.payload.to;
    },
    updateCategoryIdState: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    clearAllFilters: () => initialState,
    clearOneFilter: (state, action: PayloadAction<keyof ISearchState>) => {
      state[action.payload] = "";
    },
  },
});

export const {
  updatePricesState,
  updateCategoryIdState,
  clearAllFilters,
  clearOneFilter,
} = searchSlice.actions;

export default searchSlice.reducer;
