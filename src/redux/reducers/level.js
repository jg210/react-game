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
      let level: number = action.payload.level;
      if (level === -1) { // TODO Don't use magic number.
        level = state.current + 1;
      }
      return {...state, current: level};
    }
    default: {
      return state;
    }
  }
};

