import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISearchState {
  search: string;
  from: string;
  to: string;
  category: string;
  sortBy: string;
  isStateInitial: boolean;
}

interface ISearchStateWithNull {
  [key: string]: string | null;
}

const initialState: ISearchState = {
  search: "",
  from: "",
  to: "",
  category: "",
  sortBy: "",
  isStateInitial: true,
};

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
      state.sortBy = "";
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
    clearAllFilters: (state) => {
      return {
        ...initialState,
        search: state.search,
        isStateInitial: state.isStateInitial,
      };
    },
    clearOneFilter: (state, action: PayloadAction<keyof ISearchState>) => {
      if (action.payload === "isStateInitial") return;
      state[action.payload] = "";
    },
    updateAllStates: (state, action: PayloadAction<ISearchStateWithNull>) => {
      const { search, from, to, category, sortBy } = action.payload;
      state.search = search ? search : "";
      state.from = from ? from : "";
      state.to = to ? to : "";
      state.category = category ? category : "";
      state.sortBy = sortBy ? sortBy : "";
      state.isStateInitial = false;
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
