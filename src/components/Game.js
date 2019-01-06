// @flow
//
// (c) 2018-2019 Jeremy Green

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { GameEngine } from '../engine/GameEngine';
import { levelComplete, scoreUpdate } from '../redux/actions';
import { type DebugState } from '../redux/reducers/debug'
import { type LevelState } from '../redux/reducers/level'
import { Util } from '../util/Util';

type Props = {
  level: number,
  wireframe: boolean,
  levelComplete: () => void,
  scoreUpdate: (points: number) => void
}

type State = {
}

export class Game extends Component<Props,State> {

  static CONTAINER_ID = "matter_js_container";

  static getContainer(): ?HTMLElement {
    return document.getElementById(Game.CONTAINER_ID);
  }

  // Set keyboard focus on the Game component.
  //
  // TODO a more elegant way of setting keyboard focus.
  // ...CONTAINER_ID should have different value for each Game instance.
  static focus() {
    const container = Game.getContainer();
    if (container) {
      container.focus();
    }
  }

  gameEngine: ?GameEngine;

  constructor(props: Props) {
    super(props);
    this.gameEngine = null;
  }

  render() {
    if (this.gameEngine) {
      this.gameEngine.setWireframe(this.props.wireframe);
    }
    return (
      // Need tabIndex, otherwise can't get focus and capture key events.
      <div
        className="Game"
        id={Game.CONTAINER_ID}
        tabIndex="0" />
    );
  }

  _startEngine() {
    const container = Util.nonNull(Game.getContainer());
    this.gameEngine = new GameEngine(
      container,
      this.props.level,
      this.props.wireframe,
      this.props.levelComplete,
      this.props.scoreUpdate);
    this.gameEngine.start();
  }

  _stopEngine() {
    if (this.gameEngine) {
      this.gameEngine.stop();
      this.gameEngine = null;
    }
  }

  // React lifecycle.
  componentDidMount() {
    this._startEngine();
  }

  // React lifecycle.
  componentWillUnmount() {
    this._stopEngine();
  }

  // React lifecycle.
  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.props.level === prevProps.level) {
      return;
    }
    this._stopEngine();
    this._startEngine();
  }

}

// TODO Should LevelState/DebugState etc. include key too?
const mapStateToProps = (state: {level: LevelState, debug: DebugState}) => {
  const level = state.level.current;
  const wireframe = state.debug.wireframe;
  return { level, wireframe };
};
const actionCreators = {
  levelComplete,
  scoreUpdate
}
export default connect(mapStateToProps, actionCreators)(Game);
