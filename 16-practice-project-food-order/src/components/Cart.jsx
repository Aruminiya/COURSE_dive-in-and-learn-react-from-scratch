import Modal from "./UI/Modal";
import { useContext } from "react";
import { CartContext } from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import { UserProgressContext } from "../store/UserProgressContext";
export default function Cart() {
  const { items } = useContext(CartContext);
  const { userProgres, hideCart, showCheckout, hideCheckout } = useContext(UserProgressContext);

  const cartTotal = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <Modal className="cart" open={userProgres === 'cart'}>
      <>
        <h2>Your Cart</h2>
        <ul>
          {items.map(item => (
              <li key={item.id}>
                {item.name} - {item.quantity}
              </li>
            ))
          }
        </ul>
        <p className="cart-total">Total: {currencyFormatter.format(cartTotal)}</p>
        <p className="modal-actions">
              <Button textOnly onClick={hideCart}>Close</Button>
              <Button onClick={showCheckout}>Go to Checkout</Button>
        </p>
      </>
    </Modal>
  );
};