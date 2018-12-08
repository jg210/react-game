// @flow

import React from 'react';
import { connect } from "react-redux";

import { startGame } from '../redux/actions';

type Props = {
  startGame: () => void
};

const StartScreen = (props: Props) => {
  return (
    <div
      tabIndex="0"
      onClick={props.startGame}
      onKeyPress={props.startGame}
      className="StartScreen">
      <p>Press any key to start game.</p>
      <p>Use left and right arrows to position the magnet.</p>
      <p>Press space to turn the magnet on or off.</p>
    </div>
  );
};


const mapStateToProps = null;
const actionCreators = { startGame };

export default connect(mapStateToProps, actionCreators)(StartScreen);
