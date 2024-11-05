const redux = require('redux');

// 定义一个 reducer 函数，接收当前状态和 action，返回新的状态
const counterReducer = (state = { counter: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { 
        counter: state.counter + 1 
      };
    case 'DECREMENT':
      return { 
        counter: state.counter - 1 
      };
    default:
      return state;
  }
};

// 创建 Redux store，传入 reducer
const store = redux.createStore(counterReducer);

// 打印初始状态
console.log(store.getState());

// 定义一个订阅者函数，每当状态更新时被调用
const counterSubscriber = () => {
  const latestState = store.getState();
  console.log('counterSubscriber', latestState);
};

// 订阅 store 的更新
store.subscribe(counterSubscriber);

// 派发一些 action 来改变状态
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });