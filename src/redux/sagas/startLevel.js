// @flow
//
// (c) 2018-2019 Jeremy Green

import { call, put, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga'

import { START_LEVEL } from '../actionTypes';
import { screenChange } from '../actions';

export function* startLevel(): Generator<*,*,*> {
  yield put(screenChange("startLevel"));
  yield call(delay, 2500);
  yield put(screenChange("game"));
}

export function* startLevelListener(): Generator<*,*,*> {
  yield takeEvery(START_LEVEL, startLevel);
}

