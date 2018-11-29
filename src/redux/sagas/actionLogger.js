// @flow

import { takeEvery } from 'redux-saga/effects';

import type Action from 'redux';

export default function* actionLogger(): Generator<*,*,*> {
  yield takeEvery("*",
    // eslint-disable-next-line require-yield
    function*(action: Action) {
      console.log(`Action: ${action.type}`);
    });
}

