import { createContext, useState } from "react";

export const UserProgressContext = createContext({
  userProgres: '', // 'cart' | 'checkout'
  showCart: () => {},
  hideCart: () => {}, 
  showCheckout: () => {},
  hideCheckout: () => {}
});

export default function UserProgressContextProvider({ children }) {
  const [userProgres, setUserProgres] = useState('');

  function showCart() {
    setUserProgres('cart');
  }

  function hideCart() {
    setUserProgres('');
  }

  function showCheckout() {
    setUserProgres('checkout');
  }

  function hideCheckout() {
    setUserProgres('');
  }

  return (
    <UserProgressContext.Provider value={{
      userProgres,
      showCart,
      hideCart,
      showCheckout,
      hideCheckout
    }}>
      {children}
    </UserProgressContext.Provider>
  );
}