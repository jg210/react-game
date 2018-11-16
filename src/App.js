import React, { Component } from 'react';
import './App.css';
import { Game } from './Game';
import { LevelSelector } from './LevelSelector';
import { Score } from './Score';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      level: 1,
      score: 0
    };
    this.handleLevelChange = this.handleLevelChange.bind(this);
    this.handleScoreUpdate = this.handleScoreUpdate.bind(this);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Score score={this.state.score} />
          <Game
            level={this.state.level}
            onScoreUpdate={this.handleScoreUpdate}
          />
          <LevelSelector
            level={this.state.level}
            numberOfLevels={10}
            onClick={this.handleLevelChange} />
        </header>
      </div>
    );
  }

  handleLevelChange(level) {
    this.setState({ level: level });
  }

  handleScoreUpdate(points) {
    var score = this.state.score;
    if (points === null) {
      score = 0;
    } else {
      score += points;
    }
    this.setState({ score: score});
  }

}

export default App;
