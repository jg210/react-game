// @flow

import type Action from 'redux';
import { put, takeEvery } from 'redux-saga/effects';

import { START_GAME } from '../actionTypes';
import { startLevel } from '../actions';

export default function*(): Generator<*,*,*> {
  yield takeEvery(START_GAME,
    function*(action: Action) {
      yield put(startLevel());
    });
}


