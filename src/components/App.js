// @flow

import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { store } from '../redux/store';
import './App.css';
import Screen from '../screen';

type Props = {
};

type State = {
};

class App extends Component<Props,State> {

  // eslint-disable-next-line flowtype/no-weak-types
  store: Object;

  constructor(props: Props) {
    super(props);
    this.store = store;
  }

  render() {
    return (
      <Provider store={this.store}>
        <div className="App">
          <header className="App-header">
            <Screen/>
          </header>
        </div>
      </Provider>
    );
  }

}

export default App;
