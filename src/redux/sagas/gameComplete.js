// @flow

import { put, takeEvery } from 'redux-saga/effects';

import { GAME_COMPLETE } from '../actionTypes';
import { screenChange } from '../actions';

export function* gameComplete(): Generator<*,*,*> {
  yield put(screenChange("gameComplete"));
}

export function* gameCompleteListener(): Generator<*,*,*> {
  yield takeEvery(GAME_COMPLETE, gameComplete);
}


