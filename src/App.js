// @flow

import React, { Component } from 'react';
import { Provider } from 'react-redux';

import './App.css';
import Game from './Game';
import { LevelSelector } from './LevelSelector';
import Scores from './Scores';
import { store } from './redux/store';

type Props = {
};

type State = {
  level: number
};

class App extends Component<Props,State> {

  // eslint-disable-next-line flowtype/no-weak-types
  store: any;

  constructor(props: Props) {
    super(props);
    this.store = store;
    this.state = {
      level: 1,
    };
  }

  render() {
    return (
      <Provider store={this.store}>
        <div className="App">
          <header className="App-header">
            <Scores />
            <Game
              level={this.state.level}
            />
            <LevelSelector
              level={this.state.level}
              numberOfLevels={10}
              onClick={this._handleLevelChange} />
          </header>
        </div>
      </Provider>
    );
  }

  _handleLevelChange = (level: number) => {
    this.setState({ level: level });
  }

}

export default App;
