// @flow

import type Action from 'redux';
import { call, put, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga'

import { NEXT_LEVEL } from '../actionTypes';
import { screenChange, levelChange } from '../actions';

export default function* nextLevel(): Generator<*,*,*> {
  yield takeEvery(NEXT_LEVEL,
    function*(action: Action) {
      yield put(screenChange("nextLevel"));
      yield call(delay, 2500);
      yield put(levelChange(-1));
      // TODO Game Over if have run out of levels.
      yield put(screenChange("game"));
    });
}


