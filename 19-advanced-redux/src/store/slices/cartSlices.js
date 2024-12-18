import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], totalQuantity: 0, changed: false },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.title === newItem.title);
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          quantity: newItem.quantity,
          total: newItem.price * newItem.quantity,
          price: newItem.price,
          description: newItem.description,
        });
      } else {
        existingItem.quantity++;
        existingItem.total = existingItem.total + newItem.price * newItem.quantity;
      }
    },
    removeItemCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.total = existingItem.total - existingItem.price * existingItem.quantity;
      }
    },
    replaceCart(state, action) {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
      state.changed = false;
    },
    clearCart(state) {
      state.items = [];
      state.changed = false;
    },
  },
});


export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
