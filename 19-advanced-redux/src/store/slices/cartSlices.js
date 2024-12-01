import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./uiSlices";
const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], totalQuantity: 0 },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.title === newItem.title);
      state.totalQuantity++;
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
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.total = existingItem.total - existingItem.price * existingItem.quantity;
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const sendCartData = (cartData) => {
  return async (dispatch) => {
    dispatch(uiActions.showNotification({
      status: 'pending',
      title: 'Sending...',
      message: 'Sending cart data!',
    }));

    const sendRequest = async () => {
      try {
        const response = await fetch('https://course-react-from-scratch-default-rtdb.asia-southeast1.firebasedatabase.app/cartItems.json', {
          method: 'PUT',
          body: JSON.stringify(cartData),
        });

        if (!response.ok) {
          throw new Error('Sending cart data failed.');
        }

        return response.json();
      } catch (error) {
        throw new Error('Sending cart data failed.');
      }
    }
    
    try {
      await sendRequest();
    } catch (error) {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Sending cart data failed.',
      }));
    }

    dispatch(uiActions.showNotification({
      status: 'success',
      title: 'Success!',
      message: 'Sent cart data successfully!',
    }));
  }
}

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
