import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';
import { CartContext } from '../store/CartContext';
import { UserProgressContext } from '../store/UserProgressContext';

export default function Header() {
  const { items } = useContext(CartContext);
  const { showCart } = useContext(UserProgressContext);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <header id="main-header">
        <div id="title">
          <img src={logoImg} alt="A restaurant" />
          <h1>ReactFood</h1>
        </div>
        <nav>
          <Button textOnly onClick={showCart}>Cart ({totalItems})</Button>
        </nav>
      </header>
    </>
  );
};