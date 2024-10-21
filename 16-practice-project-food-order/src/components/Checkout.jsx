import Modal from "./UI/Modal";
import { useContext } from "react";
import { CartContext } from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import { UserProgressContext } from "../store/UserProgressContext";
import Input from "./UI/Input";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function Checkout() {
  const { items, clearCart } = useContext(CartContext);
  const { userProgres, hideCheckout } = useContext(UserProgressContext);

  const { data, isLoading: isSending, error, sendRequest } = useHttp(
    'http://localhost:3000/orders',
    requestConfig
  );

  const cartTotal = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const customerData = Object.fromEntries(formData);

    try { 
      await sendRequest({
        order: {
        items: items,
        customer: customerData,
      },
    }); 
      clearCart();
    } catch (error) {
      throw new Error(error.message || 'Failed to send order data');
    }
  };

  let actions = (
    <>
      <Button type="button" textOnly onClick={hideCheckout}>Close</Button>
      <Button type="submit" >Submit Order</Button>
    </>
  )

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return <Modal open={userProgres === 'checkout'} onClose={hideCheckout}>
      <h2>Success!</h2>
      <p>Your order was submitted successfully!</p>
      <p>We will get back to you with more details via email within the next few minutes.</p>
      <div className="modal-actions">
        <Button type="button" onClick={hideCheckout}>Okey</Button>
      </div>
    </Modal>;
  }

  return (
    <Modal className="cart" open={userProgres === 'checkout'} onClose={userProgres === 'checkout' ? hideCheckout : null}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label="Full Name" id="full-name" name="name" type="text" />
        <Input label="E-Mail Address" id="email" name="email" type="email" />
        <Input label="Street" id="street" name="street" type="text" />
        <div className="control-row">
          <Input label="Postal Code" id="postal-code" name="postal-code" type="text" />
          <Input label="City" id="city" name="city" type="text" />
        </div>

        {error && <Error title="Failed to send order data" message={error} />}
        
        <p className="modal-actions">
          {actions}
        </p>
      </form>
    </Modal>
  );
};