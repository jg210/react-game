// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { GameEngine } from './engine/GameEngine';
import { levelComplete, scoreUpdate } from './redux/actions';
import type { LevelState } from './redux/reducers/level'

type Props = {
  level: number,
  levelComplete: () => void,
  scoreUpdate: (points: number) => void
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
      // Need tabIndex, otherwise can't get focus and capture key events.
      <div
        className="Game"
        id={this.CONTAINER_ID}
        tabIndex="0" />
    );
  }

  startEngine() {
    this.gameEngine = new GameEngine(
      this.CONTAINER_ID,
      this.props.level,
      this.props.levelComplete,
      this.props.scoreUpdate);
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

const mapStateToProps = (state: {level: LevelState}) => {
  const level = state.level.current;
  return { level };
};
const actionCreators = {
  levelComplete,
  scoreUpdate
}
export default connect(mapStateToProps, actionCreators)(Game);
