import { createSlice } from '@reduxjs/toolkit';

// Initial state for auth
const initialState = {
  isAuthenticated: false,
  userRole: null, // or '' if you prefer an empty string as default
};

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to log the user in
    login(state, action) {
      state.isAuthenticated = true;
      state.userRole = action.payload.userRole; // e.g., 'admin', 'user'
    },
    // Action to log the user out
    logout(state) {
      state.isAuthenticated = false;
      state.userRole = null; // Reset user role when logging out
    },
  },
});

// Export actions to be dispatched
export const { login, logout } = authSlice.actions;

// Export the reducer to be used in the store
export default authSlice.reducer;