// @flow

import type Action from 'redux';
import { call, put, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga'

import { START_GAME } from '../actionTypes';
import { screenChange } from '../actions';

export default function* nextLevel(): Generator<*,*,*> {
  yield takeEvery(START_GAME,
    function*(action: Action) {
      yield put(screenChange("newLevel"));
      yield call(delay, 2500);
      yield put(screenChange("game"));
    });
}


