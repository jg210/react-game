// @flow
//
// (c) 2018-2019 Jeremy Green

import { Action } from 'redux';
import { RESET_SCORE, SCORE_UPDATE } from '../actionTypes';

export type ScoreState = {
  +current: number
}

const initialState: ScoreState = {
  current: 0
}

export const score = (state: ScoreState = initialState, action: Action): ScoreState => {
  let { current } = state;
  switch (action.type) {
    case RESET_SCORE: {
      return {...state, current: 0};
    }
    case SCORE_UPDATE: {
      const points: number = action.payload.points;
      current += points;
      return {...state, current};
    }
    default: {
      return state;
    }
  }
};

