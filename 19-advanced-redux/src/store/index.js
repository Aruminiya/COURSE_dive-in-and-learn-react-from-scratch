import { configureStore } from "@reduxjs/toolkit";
import cartSlices from "./slices/cartSlices";
import uiSlices from "./slices/uiSlices";

const store = configureStore({
  reducer: {
    cart: cartSlices,
    ui: uiSlices,
  },
});

store.subscribe(() => {
  console.log(store.getState());
});

export default store;
