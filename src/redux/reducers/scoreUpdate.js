// @flow
import { SCORE_UPDATE } from '../actionTypes';

export type ScoreState = {
  +score: number,
  +highScore: number
}

const initialState: ScoreState = {
  score: 0,
  highScore: 0
}

export const scoreUpdate = (state: ScoreState = initialState, action: ScoreUpdate) => {
  let { score, highScore } = state;
  switch (action.type) {
  case SCORE_UPDATE: {
    const points: ?number = action.payload.points;
    if (points === null) {
      score = 0;
    } else {
      score += points;
      if (score > highScore) {
        highScore = score;
      }
    }
    return {...state, score, highScore};
  }
  default: {
    return state;
  }
  }}
  ;

