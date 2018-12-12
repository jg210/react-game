// @flow

import { takeEvery } from 'redux-saga/effects';

import type { Action } from 'redux';

import { Log } from '../../util/Log';

// eslint-disable-next-line require-yield
export function* actionLogger(action: Action): Generator<*,*,*> {
  Log.info(`Action: ${action.type}`);
}

export function* actionLoggerListener(): Generator<*,*,*> {
  yield takeEvery("*", actionLogger);
}

