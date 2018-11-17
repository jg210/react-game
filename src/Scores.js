import React from 'react';

export const Scores = props => {
  return (
    <div className="Scores">
      <span className="Score">{props.score}</span>
      <span className="ScorePadding">&nbsp;-&nbsp;</span>
      <span className="HighScore">{props.highScore}</span>
    </div>
  );
}

