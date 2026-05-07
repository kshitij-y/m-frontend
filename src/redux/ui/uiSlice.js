import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarOpen: true,
  mobileMenuOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,

  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },

    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
  },
});

export const { toggleSidebar, toggleMobileMenu } = uiSlice.actions;

export default uiSlice.reducer;