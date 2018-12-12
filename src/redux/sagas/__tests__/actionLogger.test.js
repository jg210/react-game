// @flow

import { actionLogger, actionLoggerListener } from '../actionLogger';

import { takeEvery } from 'redux-saga/effects';

it(`listens for every action}`, () => {
  const generator = actionLoggerListener();
  expect(generator.next().value).toEqual(takeEvery("*", actionLogger));
  expect(generator.next().done).toBe(true);
});

it('logs every action', () => {
  const action = {
    type: "foobar"
  }
  const FAKE_DATE = new Date("2018-12-11T12:34:00z");
  const T = FAKE_DATE.toISOString();
  global.Date = jest.fn(() => FAKE_DATE);
  jest.spyOn(console, "log");
  const generator = actionLogger(action);
  expect(generator.next().done).toBe(true);
  expect(console.log).toBeCalledWith(`${T}  INFO Action: ${action.type}`);
});