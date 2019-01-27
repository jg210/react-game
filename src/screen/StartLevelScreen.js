// @flow
//
// (c) 2018-2019 Jeremy Green

import React from 'react';
import { connect } from "react-redux";
import type { LevelState } from '../redux/reducers/level';
import { dismissStartLevelScreen } from '../redux/actions';

type Props = {
  level: number,
  dismissStartLevelScreen: () => void
};

export const StartLevelScreen = (props: Props) => {
  return (
    <div onClick={props.dismissStartLevelScreen}>Level {props.level}</div>
  );
};

const mapStateToProps = (state: {level: LevelState}) => {
  const level = state.level.current;
  return { level };
};
const actionCreators = {
  dismissStartLevelScreen
};

export default connect(mapStateToProps, actionCreators)(StartLevelScreen);
