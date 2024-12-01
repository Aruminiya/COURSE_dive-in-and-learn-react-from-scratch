import { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from './store/slices/uiSlices';
import Notification from './components/UI/Notification';

let isInitial = true;

function App() {
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
  const cartItems = useSelector((state) => state.cart.items);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    const sendCartData = async () => {
      try {
        dispatch(uiActions.showNotification({
          status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      }));

      const response = await fetch('https://course-react-from-scratch-default-rtdb.asia-southeast1.firebasedatabase.app/cartItems.json', {
        method: 'PUT',
        body: JSON.stringify(cartItems),
      });

      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }

      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success!',
          message: 'Sent cart data successfully!',
        }));
      } catch (error) {
        dispatch(uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed.',
        }));
      }
    };

    sendCartData();
  }, [cartItems, dispatch]);

  return (
    <>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {cartIsVisible && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
