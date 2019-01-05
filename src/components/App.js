// @flow
//
// (c) 2018-2019 Jeremy Green

import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { storeFactory } from '../redux/store';
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
    this.store = storeFactory();
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
