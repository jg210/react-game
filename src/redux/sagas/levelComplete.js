// @flow

import type Action from 'redux';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga'

import { NEXT_LEVEL } from '../actionTypes';
import { screenChange, levelChange, gameComplete } from '../actions';
import { isLastLevel } from '../selectors';

export default function* nextLevel(): Generator<*,*,*> {
  yield takeEvery(NEXT_LEVEL,
    function*(action: Action) {
      if (yield select(isLastLevel)) {
        yield put(gameComplete());
      } else {
        yield put(levelChange());
        yield put(screenChange("newLevel"));
        yield call(delay, 2500);
        yield put(screenChange("game"));
      }
    });
}

