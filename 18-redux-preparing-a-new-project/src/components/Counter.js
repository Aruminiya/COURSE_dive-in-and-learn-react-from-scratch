import { useSelector, useDispatch } from 'react-redux';

import classes from './Counter.module.css';

const Counter = () => {
  const counter = useSelector(state => state.counter);
  const showCounter = useSelector(state => state.showCounter);

  const dispatch = useDispatch();

  const incrementHandler = (amount = null) => {
    dispatch({ type: 'INCREMENT', payload: { amount } });
  };

  const decrementHandler = (amount = null) => {
    dispatch({ type: 'DECREMENT', payload: { amount } });
  };

  const toggleCounterHandler = () => {
    dispatch({ type: 'TOGGLE_COUNTER' });
  };


  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={() => incrementHandler()}>Increment</button>
        <button onClick={() => incrementHandler(5)}>Increment by 5</button>
        <button onClick={() => decrementHandler()}>Decrement</button>
        <button onClick={() => decrementHandler(5)}>Decrement by 5</button>
      </div>
      <button onClick={() => toggleCounterHandler()}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
