import React from 'react';

export const Scores = props => {
  return (
    <div className="Scores">
      <div>score: {props.score}</div>
      <div>highest score: {props.highScore}</div>
    </div>
  );
}

