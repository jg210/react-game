// @flow
import React from 'react';
import { connect } from "react-redux";
import type { ScoreState } from '../redux/reducers/score';

type Props = {
  score: {
    current: number,
    high: number
  }
}

const Scores = (props: Props) => {
  return (
    <div className="Scores">
      <div>{props.score.current}</div>
    </div>
  );
}

const mapStateToProps = (state: {score: ScoreState}) => {
  const { score } = state;
  return { score };
}

export default connect(mapStateToProps)(Scores);