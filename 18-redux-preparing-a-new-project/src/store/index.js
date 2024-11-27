import { createStore } from 'redux';

const initialState = { counter: 0, showCounter: true };

const counterReducer = (state = initialState, action) => {  
  switch (action.type) {
    case 'INCREMENT':
      return { 
        counter: state.counter + (action.payload?.amount || 1),
        showCounter: state.showCounter
      };
    case 'DECREMENT':
      return { 
        counter: state.counter - (action.payload?.amount || 1),
        showCounter: state.showCounter
      };
    case 'TOGGLE_COUNTER':
      return {
        counter: state.counter,
        showCounter: !state.showCounter
      };
    default:
      return state;
  }
};

const store = createStore(counterReducer);

store.subscribe(() => {
  console.log('store.getState()', store.getState());
});

export default store;