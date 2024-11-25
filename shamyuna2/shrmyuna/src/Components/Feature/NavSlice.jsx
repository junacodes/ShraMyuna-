import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false, // Default state for isOpen
};

const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    toggleNavbar: (state) => {
      state.isOpen = !state.isOpen; // Toggle isOpen
    },
  },
});

export const { toggleNavbar } = navbarSlice.actions;
export default navbarSlice.reducer;
