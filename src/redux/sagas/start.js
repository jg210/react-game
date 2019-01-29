// @flow
//
// (c) 2019 Jeremy Green

import { put, takeEvery } from 'redux-saga/effects';

import { START } from '../actionTypes';
import { levelChange, resetScore, screenChange } from '../actions';

export function* start(): Generator<*,*,*> {
  yield put(resetScore());
  yield put(levelChange(1));
  yield put(screenChange("start"));
}

export function* startListener(): Generator<*,*,*> {
  yield takeEvery(START, start);
}


