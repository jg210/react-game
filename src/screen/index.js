// @flow

import React from 'react';
import { connect } from 'react-redux';

import type { ScreenState } from '../redux/reducers/screen';
import GameScreen from './GameScreen';
import GameOverScreen from './GameOverScreen';
import NextLevelScreen from './NextLevelScreen';

const screens = {
  "game": GameScreen,
  "gameOver": GameOverScreen,
  "nextLevel": NextLevelScreen,
}

export type ScreenType = $Keys<typeof screens>;

type Props = {
  +screen: ScreenType
}

const Screens = (props: Props) => {
  const component = screens[props.screen];
  return React.createElement(component, {}, null);
}

const mapStateToProps = (state: {screen: ScreenState}) => {
  const screen = state.screen.current;
  return { screen };
};
const actionCreators = {};
export default connect(mapStateToProps, actionCreators)(Screens);
