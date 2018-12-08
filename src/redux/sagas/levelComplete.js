// @flow

import type Action from 'redux';
import { put, select, takeEvery } from 'redux-saga/effects';

import { LEVEL_COMPLETE } from '../actionTypes';
import { levelChange, startLevel, gameComplete } from '../actions';
import { isLastLevel } from '../selectors';

export default function*(): Generator<*,*,*> {
  yield takeEvery(LEVEL_COMPLETE,
    function*(action: Action) {
      if (yield select(isLastLevel)) {
        yield put(gameComplete());
      } else {
        yield put(levelChange());
        yield put(startLevel());
      }
    });
}

