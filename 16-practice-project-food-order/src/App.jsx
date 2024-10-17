import { useContext } from 'react';
import Header from './components/Header.jsx';
import Meals from './components/Meals.jsx';
import Modal from './components/UI/Modal.jsx';
import { CartContext } from './store/CartContext.jsx';
function App() {
  const { items } = useContext(CartContext);
  console.log(items);
  return (
    <> 
      <p>{JSON.stringify(items)}</p>
      <Modal>
        <p>Modal</p>
      </Modal>
      <Header />
      <Meals />
    </>
  );
}

export default App;
