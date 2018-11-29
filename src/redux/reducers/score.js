// @flow
import { Action } from 'redux';
import { GAME_OVER, SCORE_UPDATE } from '../actionTypes';

export type ScoreState = {
  +current: number,
  +high: number
}

const initialState: ScoreState = {
  current: 0,
  high: 0
}

export const score = (state: ScoreState = initialState, action: Action): ScoreState => {
  let { current, high } = state;
  switch (action.type) {
  case SCORE_UPDATE: {
    const points: number = action.payload.points;
    current += points;
    if (current > high) {
      high = current;
    }
    return {...state, current, high};
  }
  case GAME_OVER: {
    current = 0;
    return {...state, current};
  }
  default: {
    return state;
  }
  }};

