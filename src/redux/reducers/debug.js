// @flow
//
// (c) 2018-2019 Jeremy Green


import { Action } from 'redux';
import { TOGGLE_WIREFRAME_MODE } from '../actionTypes';

export type DebugState = {
  +wireframe: boolean
}

const initialState: DebugState = {
  wireframe: false
}

export const debug = (state: DebugState = initialState, action: Action): DebugState => {
  switch (action.type) {
    case TOGGLE_WIREFRAME_MODE: {
      return {...state, wireframe: !state.wireframe};
    }
    default: {
      return state;
    }
  }
};

