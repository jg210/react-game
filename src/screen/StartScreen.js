// @flow
//
// (c) 2018-2019 Jeremy Green

import React, { Component } from 'react';
import { connect } from "react-redux";

import Level from '../components/Level';
import { startGame } from '../redux/actions';

type Props = {
  startGame: () => void,
  toggleFullscreen: () => void
};

export class StartScreen extends Component<Props> {

  // eslint-disable-next-line flowtype/no-weak-types
  ref: { current: any } = React.createRef();

  constructor(props: Props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const showLevelSelector: boolean =
      process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === "test";
    const level = showLevelSelector ? <Level /> : null;
    return (
      <div
        ref={this.ref}
        tabIndex="0"
        onClick={this.handleClick}
        onKeyPress={this.handleClick}
        className="StartScreen">
        <p>Touch screen, click or press any key to start game.</p>
        <p>Use your finger, mouse or arrow keys to position the magnet.</p>
        <p>Release finger/button or press space to turn the magnet on or off.</p>
        <p>You move to the next level when all the objects (including the ball) are at the bottom of the box.</p>
        <p>Double clicking/tapping on score toggles debug mode.</p>
        {level}
      </div>
    );
  }

  handleClick: () => void; // Allows binding in constructor without flow error.
  async handleClick() {
    this.props.toggleFullscreen(); // Can only be called from UI event.
    this.props.startGame();
    // Avoid resizing the screen while physics engine is running.
    if (window.screen &&
      window.screen.orientation &&
      window.screen.orientation.lock &&
      window.screen.orientation.type) {
      // https://w3c.github.io/screen-orientation/
      try {
        await window.screen.orientation.lock(window.screen.orientation.type);
      } catch (e) {
        // NotSupportedError.
      }
    }
  }

  componentDidMount() {
    this.ref.current.focus();
  }

}

const mapStateToProps = null;
const actionCreators = { startGame };

export default connect(mapStateToProps, actionCreators)(StartScreen);
