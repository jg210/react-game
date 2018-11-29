// @flow

import type Action from 'redux';
import { call, put, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga'

import { GAME_OVER } from '../actionTypes';
import { screenChange } from '../actions';

export default function* gameOver(): Generator<*,*,*> {
  yield takeEvery(GAME_OVER,
    function*(action: Action) {
      yield put(screenChange("gameOver"));
      yield call(delay, 2500);
      yield put(screenChange("game"));
    });
}


