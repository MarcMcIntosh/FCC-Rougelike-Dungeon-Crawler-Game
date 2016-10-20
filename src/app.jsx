import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers/index';
import ToggleButton from './components/ToggleButton';
import StatusBar from './components/StatusBar';
import Game from './components/Board';

require('./styles/main.scss');

/* Development Store compatable with redux devtools */
/* const store = createStore(reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);*/

/* Production */
const store = createStore(reducers);
const App = () => (
  <Provider store={store}>
    <div>
      <h1>Hello World</h1>
      <StatusBar />
      <div className="buttons">
        <ToggleButton />
      </div>
      <Game getState={store.getState} />
    </div>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('App'));
