import { useContext } from 'react';
import Header from './components/Header.jsx';
import Meals from './components/Meals.jsx';
import Cart from './components/Cart.jsx';
import Checkout from './components/Checkout.jsx';
import { CartContext } from './store/CartContext.jsx';
function App() {
  const { items } = useContext(CartContext);
  console.log(items);
  return (
    <> 
      <Header />
      <Meals />
      <Cart />
      <Checkout />
    </>
  );
}

export default App;
