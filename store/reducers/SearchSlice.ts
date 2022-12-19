import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISearchState {
  search: string;
  from: string;
  to: string;
  category: string;
}

interface ISearchStateWNull {
  [key: string]: string | null;
}

const initialState: ISearchState = {
  search: "",
  from: "",
  to: "",
  category: "",
};

//globalThis

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateSearchAndClearFiltersState: (
      state,
      action: PayloadAction<string>
    ) => {
      state.from = "";
      state.to = "";
      state.category = "";
      state.search = action.payload;
    },
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
    updateAllStates: (state, action: PayloadAction<ISearchStateWNull>) => {
      state.search = action.payload.search ? action.payload.search : "";
      state.from = action.payload.from ? action.payload.from : "";
      state.to = action.payload.to ? action.payload.to : "";
      state.category = action.payload.category ? action.payload.category : "";
    },
  },
});

export const {
  updateSearchAndClearFiltersState,
  updatePricesState,
  updateCategoryIdState,
  clearAllFilters,
  clearOneFilter,
  updateAllStates,
} = searchSlice.actions;

export default searchSlice.reducer;
