import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Feature/CheckoutSlice";
import authReducer from "../Feature/auth/AuthSlice"
import navbarReducer from "../Feature/NavSlice";
import { thunk } from 'redux-thunk'
const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    navbar: navbarReducer,
  
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Add thunk middleware explicitly

});

export default store;