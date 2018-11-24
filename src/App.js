// @flow

import React, { Component } from 'react';
import './App.css';
import { Game } from './Game';
import { LevelSelector } from './LevelSelector';
import { Scores } from './Scores';

type Props = {
};

type State = {
  level: number,
  score: number,
  highScore: number
};

class App extends Component<Props,State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      level: 1,
      score: 0,
      highScore: 0
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Scores score={this.state.score} highScore={this.state.highScore} />
          <Game
            level={this.state.level}
            onScoreUpdate={this._handleScoreUpdate}
          />
          <LevelSelector
            level={this.state.level}
            numberOfLevels={10}
            onClick={this._handleLevelChange} />
        </header>
      </div>
    );
  }

  _handleLevelChange = (level: number) => {
    this.setState({ level: level });
  }

  _handleScoreUpdate = (points: ?number) => {
    var {score, highScore} = this.state;
    if (points === null) {
      score = 0;
    } else {
      score += points;
      if (score > highScore) {
        highScore = score;
      }
    }
    this.setState({score, highScore});
  }

}

export default App;
