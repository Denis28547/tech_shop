import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISearchState {
  search: string;
  from: string;
  to: string;
  category: string;
  sort: string;
  page: string;
  isStateInitial: boolean;
  item_count: string;
  items_on_page: string;
}

interface ISearchStateWithNull {
  [key: string]: string | null;
}

const initialState: ISearchState = {
  search: "",
  from: "",
  to: "",
  category: "",
  sort: "",
  page: "",
  isStateInitial: true,
  item_count: "",
  items_on_page: "3",
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
      state.sort = "";
      state.page = "";
      state.search = action.payload;
    },
    updatePricesState: (
      state,
      action: PayloadAction<{ from: string; to: string }>
    ) => {
      state.from = action.payload.from;
      state.to = action.payload.to;
    },
    updateCategoryState: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    updateSortBy: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
    updatePage: (state, action: PayloadAction<string>) => {
      state.page = action.payload;
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
      const { search, from, to, category, sort, page } = action.payload;
      state.search = search ? search : "";
      state.from = from ? from : "";
      state.to = to ? to : "";
      state.category = category ? category : "";
      state.sort = sort ? sort : "";
      state.page = page ? page : "";
      state.isStateInitial = false;
    },
    setItemCount: (state, action: PayloadAction<string>) => {
      state.item_count = action.payload;
    },
  },
});

export const {
  updateSearchAndClearFiltersState,
  updatePricesState,
  updateCategoryState,
  updateSortBy,
  updatePage,
  clearAllFilters,
  clearOneFilter,
  updateAllStates,
  setItemCount,
} = searchSlice.actions;

export default searchSlice.reducer;
