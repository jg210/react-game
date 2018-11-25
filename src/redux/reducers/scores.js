// @flow
import { SCORE_UPDATE } from '../actionTypes';

export type ScoreState = {
  +current: number,
  +high: number
}

const initialState: ScoreState = {
  current: 0,
  high: 0
}

export const scores = (state: ScoreState = initialState, action: ScoreUpdate) => {
  let { current, high } = state;
  switch (action.type) {
  case SCORE_UPDATE: {
    const points: ?number = action.payload.points;
    if (points === null) {
      current = 0;
    } else {
      current += points;
      if (current > high) {
        high = current;
      }
    }
    return {...state, current, high};
  }
  default: {
    return state;
  }
  }};

