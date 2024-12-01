import { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { sendCartData, fetchCartData } from './store/slices/cartActions';
import Notification from './components/UI/Notification';

let isInitial = true;

function App() {
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
  const cartItems = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();
  console.log(cartItems);
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      dispatch(fetchCartData());
      return;
    }
    if (cartItems.changed) {
      dispatch(sendCartData(cartItems));
    }
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
