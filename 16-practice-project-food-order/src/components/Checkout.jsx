import Modal from "./UI/Modal";
import { useContext } from "react";
import { CartContext } from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import { UserProgressContext } from "../store/UserProgressContext";
import Input from "./UI/Input";

export default function Checkout() {
  const { items } = useContext(CartContext);
  const { userProgres, hideCheckout } = useContext(UserProgressContext);

  const cartTotal = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log(data);
    hideCheckout();
  };

  return (
    <Modal className="cart" open={userProgres === 'checkout'}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label="Full Name" id="full-name" type="text" />
        <Input label="E-Mail Address" id="email" type="email" />
        <Input label="Street" id="street" type="text" />
        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="text" />
          <Input label="City" id="city" type="text" />
        </div>
        
        <p className="modal-actions">
          <Button type="button" textOnly onClick={hideCheckout}>Close</Button>
          <Button type="submit" >Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
};