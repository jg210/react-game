// @flow
//
// (c) 2018-2019 Jeremy Green

import React, { Component } from 'react';
import { connect } from 'react-redux';

import type { ScreenState } from '../redux/reducers/screen';
import GameScreen from './GameScreen';
import GameCompleteScreen from './GameCompleteScreen';
import SplashScreen from './SplashScreen';
import StartLevelScreen from './StartLevelScreen';
import StartScreen from './StartScreen';

const screens = {
  "game": GameScreen,
  "gameComplete": GameCompleteScreen,
  "splash": SplashScreen,
  "startLevel": StartLevelScreen,
  "start": StartScreen
}

export type ScreenType = $Keys<typeof screens>;

type Props = {
  +screen: ScreenType,
  +toggleFullscreen: () => void
}

type State = {}

class Screen extends Component<Props,State> {

  render() {
    const component = screens[this.props.screen];
    return React.createElement(
      component,
      { toggleFullscreen: this.props.toggleFullscreen },
      null
    );
  }

}

export const mapStateToProps = (state: {screen: ScreenState}) => {
  const screen = state.screen.current;
  return { screen };
};
const actionCreators = {};
export default connect(mapStateToProps, actionCreators)(Screen);
