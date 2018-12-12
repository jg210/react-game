// @flow

import { put, select, takeEvery } from 'redux-saga/effects';

import { LEVEL_COMPLETE } from '../actionTypes';
import { levelChange, startLevel, gameComplete } from '../actions';
import { isLastLevel } from '../selectors';

export function* levelComplete(): Generator<*,*,*> {
  if (yield select(isLastLevel)) {
    yield put(gameComplete());
  } else {
    yield put(levelChange());
    yield put(startLevel());
  }
}

export function* levelCompleteListener(): Generator<*,*,*> {
  yield takeEvery(LEVEL_COMPLETE, levelComplete);
}

