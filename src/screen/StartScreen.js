// @flow
//
// (c) 2018-2019 Jeremy Green

import React, { Component } from 'react';
import { connect } from "react-redux";

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
    return (
      <div
        ref={this.ref}
        tabIndex="0"
        onClick={this.handleClick}
        onKeyPress={this.handleClick}
        className="StartScreen">
        <p>Press any key to start game.</p>
        <p>Use left and right arrow keys or the mouse to position the magnet.</p>
        <p>Press space to turn the magnet on or off.</p>
        <p>You move to the next level when all objects have been dislodged.</p>
      </div>
    );
  }

  handleClick: () => void; // Allows binding in constructor without flow error.
  handleClick() {
    this.props.toggleFullscreen(); // Can only be called from UI event.
    this.props.startGame();
  }

  componentDidMount() {
    this.ref.current.focus();
  }

}

const mapStateToProps = null;
const actionCreators = { startGame };

export default connect(mapStateToProps, actionCreators)(StartScreen);
