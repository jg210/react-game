import React, { Component } from 'react';
import { GameEngine } from './GameEngine';

export class Game extends Component {

  CONTAINER_ID = "matter_js_container";

  constructor(props) {
    super(props);
    this.gameEngine = null;
  }

  render() {
    return (
      <div id={this.CONTAINER_ID} />
    );
  }

  startEngine() {
    this.gameEngine = new GameEngine(
      this.CONTAINER_ID,
      this.props.level,
      this.props.onScoreUpdate);
    this.gameEngine.start();
  }

  stopEngine() {
    if (this.gameEngine) {
      this.gameEngine.stop();
      this.gameEngine = null;
    }
  }

  // React lifecycle.
  componentDidMount() {
    this.startEngine();
  }

  // React lifecycle.
  componentWillUnmount() {
    this.stopEngine();
  }

  // React lifecycle.
  componentDidUpdate(prevProps, prevState) {
    if (this.props.level === prevProps.level) {
      return;
    }
    this.stopEngine();
    this.startEngine();
  }

}
