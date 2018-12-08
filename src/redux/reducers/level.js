// @flow
import { Action } from 'redux';
import { LEVEL_CHANGE } from '../actionTypes';

export type LevelState = {
  +current: number,
  +last: number
}

const initialState: LevelState = {
  current: 1,
  last: 2
}

export const level = (state: LevelState = initialState, action: Action): LevelState => {
  switch (action.type) {
    case LEVEL_CHANGE: {
      let level: number = action.payload.level;
      if (level === null) {
        level = state.current + 1;
      }
      if (level < 1 || level > state.last) {
        throw new Error(`level out of range: ${level}`);
      }
      return {...state, current: level};
    }
    default: {
      return state;
    }
  }
};

