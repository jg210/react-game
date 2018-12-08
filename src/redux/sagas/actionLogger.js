// @flow

import { takeEvery } from 'redux-saga/effects';

import type Action from 'redux';

import { Log } from '../../Log';

export default function*(): Generator<*,*,*> {
  yield takeEvery("*",
    // eslint-disable-next-line require-yield
    function*(action: Action) {
      Log.info(`Action: ${action.type}`);
    });
}

