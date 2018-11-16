import React, { Component } from 'react';
import './App.css';
import { Game } from './Game';
import { LevelSelector } from './LevelSelector';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { level: 4 };
    this.handleLevelChange = this.handleLevelChange.bind(this);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Game level={this.state.level} />
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

}

export default App;
