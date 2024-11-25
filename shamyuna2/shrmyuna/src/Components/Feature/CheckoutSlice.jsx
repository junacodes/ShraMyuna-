import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  total: 0,
  shipping: 0,
  discount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.total += action.payload.price;
    },
    applyDiscount: (state, action) => {
      state.discount = action.payload;
    },
    setShipping: (state, action) => {
      state.shipping = action.payload;
    },
    calculateTotal: (state) => {
      const subtotal = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      state.total = subtotal - (subtotal * state.discount) / 100 + state.shipping;
    },
    removeItem: (state, action) => {
      console.log("Payload received for removal:", action.payload); // Debugging line

      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        state.total -= item.price * item.quantity;
        state.items = state.items.filter((i) => i.id !== action.payload);
      }
    },
    updateQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        state.total += (action.payload.quantity - item.quantity) * item.price;
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
  },
});

export const {
  addItem,
  applyDiscount,
  setShipping,
  calculateTotal,
  removeItem,
  updateQuantity,
  clearCart,

} = cartSlice.actions;

export default cartSlice.reducer;