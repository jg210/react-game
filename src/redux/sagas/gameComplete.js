// @flow

import { put, takeEvery } from 'redux-saga/effects';

import { GAME_COMPLETE } from '../actionTypes';
import { screenChange } from '../actions';

export default function*(): Generator<*,*,*> {
  yield takeEvery(GAME_COMPLETE,
    function*() {
      yield put(screenChange("gameComplete"));
    });
}


