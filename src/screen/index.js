// @flow

import React from 'react';
import { connect } from 'react-redux';

import type { ScreenState } from '../redux/reducers/screen';
import GameScreen from './GameScreen';
import GameCompleteScreen from './GameCompleteScreen';
import StartLevelScreen from './StartLevelScreen';
import StartScreen from './StartScreen';

const screens = {
  "game": GameScreen,
  "gameComplete": GameCompleteScreen,
  "startLevel": StartLevelScreen,
  "start": StartScreen
}

export type ScreenType = $Keys<typeof screens>;

type Props = {
  +screen: ScreenType
}

const Screen = (props: Props) => {
  const component = screens[props.screen];
  return React.createElement(component, {}, null);
}

const mapStateToProps = (state: {screen: ScreenState}) => {
  const screen = state.screen.current;
  return { screen };
};
const actionCreators = {};
export default connect(mapStateToProps, actionCreators)(Screen);
