// @flow

import React, { Component } from 'react';
import { connect } from "react-redux";

import { startGame } from '../redux/actions';

type Props = {
  startGame: () => void
};

class StartScreen extends Component<Props> {

  // eslint-disable-next-line flowtype/no-weak-types
  ref: { current: any } = React.createRef();

  render() {
    return (
      <div
        ref={this.ref}
        tabIndex="0"
        onClick={this.props.startGame}
        onKeyPress={this.props.startGame}
        className="StartScreen">
        <p>Press any key to start game.</p>
        <p>Use left and right arrows to position the magnet.</p>
        <p>Press space to turn the magnet on or off.</p>
        <p>You move to the next level when all objects have been dislodged.</p>
      </div>
    );
  }

  componentDidMount() {
    this.ref.current.focus();
  }

}

const mapStateToProps = null;
const actionCreators = { startGame };

export default connect(mapStateToProps, actionCreators)(StartScreen);
