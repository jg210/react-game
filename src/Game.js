// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { GameEngine } from './GameEngine';

type Props = {
  level: number,
  dispatch: (Action) => void
}

type State = {
}

export class Game extends Component<Props,State> {

  CONTAINER_ID = "matter_js_container";

  gameEngine: ?GameEngine;

  constructor(props: Props) {
    super(props);
    this.gameEngine = null;
  }

  render() {
    return (
      // Need tabindex, otherwise can't get focus and capture key events.
      <div
        className="Game"
        id={this.CONTAINER_ID}
        tabindex="0" />
    );
  }

  startEngine() {
    this.gameEngine = new GameEngine(
      this.CONTAINER_ID,
      this.props.level,
      this.props.dispatch);
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
  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.props.level === prevProps.level) {
      return;
    }
    this.stopEngine();
    this.startEngine();
  }

}

export default connect(null, null)(Game);
