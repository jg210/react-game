// @flow

import React from 'react';
import { connect } from "react-redux";
import type { LevelState } from '../redux/reducers/level';

type Props = {
  level: number
};

const NextLevelScreen = (props: Props) => {
  return (
    <div>Level {props.level} complete</div>
  );
};

const mapStateToProps = (state: {level: LevelState}) => {
  const level = state.level.current;
  return { level };
};
const actionCreators = {};

export default connect(mapStateToProps, actionCreators)(NextLevelScreen);
