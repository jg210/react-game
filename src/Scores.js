// @flow
import React from 'react';

type Props = {
  score: number,
  highScore: number
}

export const Scores = (props: Props) => {
  return (
    <div className="Scores">
      <div>score: {props.score}</div>
      <div>highest score: {props.highScore}</div>
    </div>
  );
}

