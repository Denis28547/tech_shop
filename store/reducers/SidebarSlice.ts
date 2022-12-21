import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISidebarsState {
  navSidebar: boolean;
  filterSidebar: boolean;
}

const initialState: ISidebarsState = {
  navSidebar: false,
  filterSidebar: false,
};

export const sidebarSlice = createSlice({
  name: "sidebars",
  initialState,
  reducers: {
    changeNavSidebarState: (state, action: PayloadAction<boolean>) => {
      state.navSidebar = action.payload;
    },
    changeFilterSidebarState: (state, action: PayloadAction<boolean>) => {
      state.filterSidebar = action.payload;
    },
  },
});

export const { changeNavSidebarState, changeFilterSidebarState } =
  sidebarSlice.actions;

export default sidebarSlice.reducer;
