// @flow
//
// (c) 2018-2019 Jeremy Green

import { call, put, race, take, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { START_LEVEL, DISMISS_START_LEVEL_SCREEN, START } from '../actionTypes';
import { scoreUpdate, screenChange } from '../actions';

export function* startLevel(): Generator<*,*,*> {
  yield put(screenChange("startLevel"));
  const { cancel } = yield race({
    // With no user interaction, show the startLevel screen for 2.5s.
    sleep: call(delay, 2500),
    // Clicking on the startLevel screen starts the level immediately.
    dismissal: take(DISMISS_START_LEVEL_SCREEN),
    // It's also possible to restart the game by exiting full screen mode.
    cancel: take(START)});
  if (!cancel) {
    yield put(scoreUpdate(1));
    yield put(screenChange("game"));
  }
}

export function* startLevelListener(): Generator<*,*,*> {
  yield takeEvery(START_LEVEL, startLevel);
}

