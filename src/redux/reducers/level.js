// @flow
import { Action } from 'redux';
import { LEVEL_CHANGE } from '../actionTypes';

export type LevelState = {
  +current: number
}

const initialState: LevelState = {
  current: 1,
}

export const level = (state: LevelState = initialState, action: Action): LevelState => {
  switch (action.type) {
  case LEVEL_CHANGE: {
    const current: number = action.payload.level;
    return {...state, current};
  }
  default: {
    return state;
  }
  }};

