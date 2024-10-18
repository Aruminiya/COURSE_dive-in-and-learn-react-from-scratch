import { useContext } from 'react';
import { currencyFormatter } from '../util/formatting';
import { CartContext } from '../store/CartContext';

export default function CartItem({ id, name, price, quantity }) {
  const { removeItem, addItem } = useContext(CartContext);

  return (
    <li className="cart-item">
      <p>{name} - {quantity} x {currencyFormatter.format(price)}</p>
      <p className="cart-item-actions">
        <button onClick={() => removeItem(id)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => addItem({ id, name, price, quantity })}>+</button>
      </p>
    </li>
  );
}