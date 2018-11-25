// @flow
import React from 'react';
import { connect } from "react-redux";
import { ScoreState } from './redux/reducers/scores';

type Props = {
  score: number,
  highScore: number
}

const Scores = (props: Props) => {
  return (
    <div className="Scores">
      <div>score: {props.scores.current}</div>
      <div>highest score: {props.scores.high}</div>
    </div>
  );
}

const mapStateToProps = (state: ScoreState) => {
  const { scores } = state;
  return { scores };
}

export default connect(mapStateToProps)(Scores);