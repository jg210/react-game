// @flow

import React, { Component } from 'react';
import { Provider } from 'react-redux';

import './App.css';
import Game from './Game';
import Level from './Level';
import Scores from './Scores';
import { store } from './redux/store';

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
            <Scores />
            <Game />
            <Level
              numberOfLevels={10}
            />
          </header>
        </div>
      </Provider>
    );
  }

}

export default App;
