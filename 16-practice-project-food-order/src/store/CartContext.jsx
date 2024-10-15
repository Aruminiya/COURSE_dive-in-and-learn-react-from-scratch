import { createContext, useReducer } from "react";

export const CartContext = createContext({
  item: [],
  addItem: (item) => {},
  removeItem: (id) => {}
});

function cartReducer(state, action) {
  switch(action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(item => item.id === action.item.id);

      const updatedItems = [...state.items];
      
      if (existingItemIndex > -1) {
        const existingItem = state.items[existingItemIndex];
        const updatedItem = {
          ...existingItem,
          quantity: state.items[existingItemIndex].quantity + 1
        };
        updatedItems[existingItemIndex] = updatedItem;
      } else {
        updatedItems.push({ ...action.item, quantity: 1 });
      }
      return {...state, items: updatedItems};
    }
    case 'REMOVE_ITEM': {
      const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
      const existingCartItem = state.items[existingCartItemIndex];
      const updatedItems = [...state.items];
      if (existingCartItem.quantity === 1) {
        
        updatedItems.splice(existingCartItemIndex, 1);
        return {...state, items: updatedItems};
      } else {
        const updatedItem = {...existingCartItem, quantity: existingCartItem.quantity - 1};
        updatedItems[existingCartItemIndex] = updatedItem;
      }
      return {...state, items: updatedItems};
    }
  }
}

export default function CartContextProvider({children}) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, {items: []});
  
  const cartContext = {
    items: cart.items,
    addItem: addItem,
    removeItem: removeItem
  };
  
  function addItem(item) {
    dispatchCartAction({type: 'ADD_ITEM', item});
  }

  function removeItem(id) {
    dispatchCartAction({type: 'REMOVE_ITEM', id});
  }

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
};