import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers/index';
import ToggleButton from './components/ToggleButton';

/* Development Store compatable with redux devtools */
const store = createStore(reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

/* Production */
// let store = createStore(reducers);
const App = () => (
  <Provider store={store}>
    <div>
      <h1>Hello World</h1>
      <ToggleButton />
    </div>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('App'));
