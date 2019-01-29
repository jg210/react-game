// @flow
//
// (c) 2018-2019 Jeremy Green

import { startLevel, startLevelListener } from '../startLevel';

import { call, put, race, take, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { START_LEVEL, DISMISS_START_LEVEL_SCREEN, START } from '../../actionTypes';
import { scoreUpdate, screenChange } from '../../actions';
it(`listens for ${START_LEVEL}`, () => {
  const generator = startLevelListener();
  expect(generator.next().value).toEqual(takeEvery(START_LEVEL, startLevel));
  expect(generator.next().done).toBe(true);
});

it('handles startLevel', () => {
  const generator = startLevel();
  expect(generator.next().value).toEqual(put(screenChange("startLevel")));
  const sleep = call(delay, 2500);
  const dismissal = take(DISMISS_START_LEVEL_SCREEN);
  expect(generator.next().value).toEqual(race({sleep, dismissal, cancel: take(START)}));
  expect(generator.next({cancel: undefined}).value).toEqual(put(scoreUpdate(1)));
  expect(generator.next().value).toEqual(put(screenChange("game")));
  expect(generator.next().done).toBe(true);
});

it('handles startLevel with START cancelling the saga', () => {
  const generator = startLevel();
  expect(generator.next().value).toEqual(put(screenChange("startLevel")));
  const sleep = call(delay, 2500);
  const dismissal = take(DISMISS_START_LEVEL_SCREEN);
  expect(generator.next().value).toEqual(race({sleep, dismissal, cancel: take(START)}));
  expect(generator.next({cancel: true}).done).toBe(true);
});