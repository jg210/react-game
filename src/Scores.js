// @flow
import React from 'react';
import { connect } from "react-redux";

type Props = {
  score: number,
  highScore: number
}

const Scores = (props: Props) => {
  return (
    <div className="Scores">
      <div>score: {props.score}</div>
      <div>highest score: {props.highScore}</div>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  const { score, highScore } = state.scoreUpdate; // TODO don't want scoreUpdate here.
  const props = {score, highScore};
  return props;
}

export default connect(mapStateToProps)(Scores);