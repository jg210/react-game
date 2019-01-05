// @flow
//
// (c) 2018-2019 Jeremy Green

import { Action } from 'redux';
import { SCREEN_CHANGE } from '../actionTypes';
import type { ScreenType } from '../../screen';

export type ScreenState = {
  +current: ScreenType
}

const initialState: ScreenState = {
  current: "start",
}

export const screen = (state: ScreenState = initialState, action: Action): ScreenState => {
  switch (action.type) {
    case SCREEN_CHANGE: {
      const current: ScreenType = action.payload.screen;
      return {...state, current};
    }
    default: {
      return state;
    }
  }
};

