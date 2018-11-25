// @flow
import React from 'react';
import { connect } from "react-redux";
import type { ScoreState } from './redux/reducers/scores';

type Props = {
  scores: {
    current: number,
    high: number
  }
}

const Scores = (props: Props) => {
  return (
    <div className="Scores">
      <div>score: {props.scores.current}</div>
      <div>highest score: {props.scores.high}</div>
    </div>
  );
}

const mapStateToProps = (state: {scores: ScoreState}) => {
  const { scores } = state;
  return { scores };
}

export default connect(mapStateToProps)(Scores);