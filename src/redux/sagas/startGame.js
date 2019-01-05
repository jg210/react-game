// @flow
//
// (c) 2018-2019 Jeremy Green

import { put, takeEvery } from 'redux-saga/effects';

import { START_GAME } from '../actionTypes';
import { startLevel } from '../actions';

export function* startGame(): Generator<*,*,*> {
  yield put(startLevel());
}

export function* startGameListener(): Generator<*,*,*> {
  yield takeEvery(START_GAME, startGame);
}


