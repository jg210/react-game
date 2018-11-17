import React, { Component } from 'react';
import './App.css';
import { Game } from './Game';
import { LevelSelector } from './LevelSelector';
import { Scores } from './Scores';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      level: 1,
      score: 0,
      highScore: 0
    };
    this.handleLevelChange = this.handleLevelChange.bind(this);
    this.handleScoreUpdate = this.handleScoreUpdate.bind(this);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Scores score={this.state.score} highScore={this.state.highScore} />
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
