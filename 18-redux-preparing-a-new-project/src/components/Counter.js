import { useSelector, useDispatch } from 'react-redux';
import { counterActions } from '../store/slices/counterSlice';
import classes from './Counter.module.css';

const Counter = () => {
  const counter = useSelector(state => state.counter.counter);
  const showCounter = useSelector(state => state.counter.showCounter);

  const dispatch = useDispatch();

  const incrementHandler = (amount = null) => {
    dispatch(counterActions.increment({ amount }));
  };

  const decrementHandler = (amount = null) => {
    dispatch(counterActions.decrement({ amount }));
  };

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
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
