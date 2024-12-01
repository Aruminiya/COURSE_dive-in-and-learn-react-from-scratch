import { uiActions } from "./uiSlices";
import { cartActions } from "./cartSlices";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://course-react-from-scratch-default-rtdb.asia-southeast1.firebasedatabase.app/cartItems.json');
        if (!response.ok) {
          throw new Error('Fetching cart data failed.');
        }
        return response.json();
      } catch (error) {
        throw new Error('Fetching cart data failed.');
      }
    }

    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart(cartData));
    } catch (error) {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Fetching cart data failed.',
      }));
    }
  }
}

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