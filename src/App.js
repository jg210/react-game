// @flow

import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';

import './App.css';
import Game from './Game';
import LevelSelector from './LevelSelector';
import Scores from './Scores';
import { store } from './redux/store';
import type { LevelState } from './redux/reducers/level';

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
            />
          </header>
        </div>
      </Provider>
    );
  }

}

const mapStateToProps = (state: {level: LevelState}) => {
  const level = state.level.current;
  return { level };
};
const actionCreators = {};
export default connect(mapStateToProps, actionCreators)(App);
