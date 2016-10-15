import React from 'react';
import ReactDOM from 'react-dom';

const MOUNT_NODE = document.getElementById('App');

class App extends React.Component {
  render() {
    return (<div>Hello World</div>);
  }
}

ReactDOM.render(<App />, MOUNT_NODE);
