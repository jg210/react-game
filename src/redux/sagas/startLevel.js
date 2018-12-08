// @flow

import type Action from 'redux';
import { call, put, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga'

import { START_LEVEL } from '../actionTypes';
import { screenChange } from '../actions';

export default function* startLevel(): Generator<*,*,*> {
  yield takeEvery(START_LEVEL,
    function*(action: Action) {
      yield put(screenChange("startLevel"));
      yield call(delay, 2500);
      yield put(screenChange("game"));
    });
}

