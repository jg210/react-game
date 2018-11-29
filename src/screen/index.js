// @flow

import { connect } from 'react-redux';

import type { ScreenState } from '../redux/reducers/screen';
import GameScreen from './GameScreen';
import GameOverScreen from './GameOverScreen';

const screens = {
  "game": GameScreen,
  "gameOver": GameOverScreen
}

export type ScreenType = $Keys<typeof screens>;

type Props = {
  +screen: ScreenType
}

const Screens = (props: Props) => {
  return screens[props.screen]();
}

const mapStateToProps = (state: {screen: ScreenState}) => {
  const screen = state.screen.current;
  return { screen };
};
const actionCreators = {};
export default connect(mapStateToProps, actionCreators)(Screens);
