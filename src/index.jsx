import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { createStore } from 'redux';

function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT': return state + 1;
    case 'DECREMENT': return state - 1;
    default: return state;
  }
}

/* Development Store compatable with redux devtools */
const store = createStore(counter,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

/* Production */
// let store = createStore(reducer);
const App = () => (
  <Provider store={store}>
    <h1>Hello World</h1>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('App'));
