// @flow
//
// (c) 2018-2019 Jeremy Green

import React from 'react';
import { connect } from "react-redux";

import type { ScoreState } from '../redux/reducers/score';
import { toggleWireframeMode } from '../redux/actions';

type Props = {
  score: number,
  toggleWireframeMode: () => void
}

export const Score = (props: Props) => {
  return (
    <div className="Score" onDoubleClick={props.toggleWireframeMode}>{props.score}</div>
  );
}

const mapStateToProps = (state: {score: ScoreState}) => {
  return { score: state.score.current };
}
const actionCreators = {
  toggleWireframeMode
};
export default connect(mapStateToProps, actionCreators)(Score);