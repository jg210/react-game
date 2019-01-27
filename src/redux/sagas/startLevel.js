// @flow
//
// (c) 2018-2019 Jeremy Green

import { call, put, race, take, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { START_LEVEL, DISMISS_START_LEVEL_SCREEN } from '../actionTypes';
import { scoreUpdate, screenChange } from '../actions';

export function* startLevel(): Generator<*,*,*> {
  yield put(screenChange("startLevel"));
  const sleep = call(delay, 2500);
  const dismissal = take(DISMISS_START_LEVEL_SCREEN);
  yield race({sleep, dismissal});
  yield put(scoreUpdate(1));
  yield put(screenChange("game"));
}

export function* startLevelListener(): Generator<*,*,*> {
  yield takeEvery(START_LEVEL, startLevel);
}

