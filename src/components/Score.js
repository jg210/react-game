// @flow
//
// (c) 2018-2019 Jeremy Green

import React from 'react';
import { connect } from "react-redux";
import type { ScoreState } from '../redux/reducers/score';

type Props = {
  score: number
}

export const Score = (props: Props) => {
  return (
    <div className="Scores">
      <div>{props.score}</div>
    </div>
  );
}

const mapStateToProps = (state: {score: ScoreState}) => {
  return { score: state.score.current };
}

export default connect(mapStateToProps)(Score);