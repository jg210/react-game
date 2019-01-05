// @flow
//
// (c) 2018-2019 Jeremy Green

import React from 'react';
import { connect } from "react-redux";
import type { LevelState } from '../redux/reducers/level';

type Props = {
  level: number
};

export const StartLevelScreen = (props: Props) => {
  return (
    <div>Level {props.level}</div>
  );
};

const mapStateToProps = (state: {level: LevelState}) => {
  const level = state.level.current;
  return { level };
};
const actionCreators = {};

export default connect(mapStateToProps, actionCreators)(StartLevelScreen);
