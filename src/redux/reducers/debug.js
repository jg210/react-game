// @flow
//
// (c) 2018-2019 Jeremy Green


import { Action } from 'redux';
import { SET_WIREFRAME_MODE } from '../actionTypes';

export type DebugState = {
  +wireframe: boolean
}

const initialState: DebugState = {
  wireframe: process.env.NODE_ENV !== 'production'
}

export const debug = (state: DebugState = initialState, action: Action): DebugState => {
  switch (action.type) {
    case SET_WIREFRAME_MODE: {
      return {...state, wireframe: action.payload.enabled};
    }
    default: {
      return state;
    }
  }
};

