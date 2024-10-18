import Modal from "./UI/Modal";
import { useContext } from "react";
import { CartContext } from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import { UserProgressContext } from "../store/UserProgressContext";
export default function Checkout() {
  const { items } = useContext(CartContext);
  const { userProgres, hideCheckout } = useContext(UserProgressContext);

  return (
    <Modal className="cart" open={userProgres === 'checkout'}>
      <>
        <h2>Checkout</h2>
        <p>Your order is being processed.</p>
        <p className="modal-actions">
          <Button textOnly onClick={hideCheckout}>Close</Button>
        </p>
      </>
    </Modal>
  );
};