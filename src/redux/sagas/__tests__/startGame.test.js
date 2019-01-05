// @flow
//
// (c) 2018-2019 Jeremy Green

import _ from 'lodash';

import { startGame as startGameSaga, startGameListener } from '../startGame';

import { put, takeEvery } from 'redux-saga/effects';

import { START_GAME } from '../../actionTypes';
import { startGame as startGameAction, startLevel } from '../../actions';

import { storeFactory } from '../../store';

it(`listens for ${START_GAME}`, () => {
  const generator = startGameListener();
  expect(generator.next().value).toEqual(takeEvery(START_GAME, startGameSaga));
  expect(generator.next().done).toBe(true);
});

it('handles startGame action, testing using effects', () => {
  const generator = startGameSaga();
  expect(generator.next().value).toEqual(put(startLevel()));
  expect(generator.next().done).toBe(true);
});

it(`handles startGame action, testing by dispatching to a redux store instance`, () => {
  const store = storeFactory();
  const stateBefore = store.getState();
  store.dispatch(startGameAction());
  const stateAfter = store.getState();
  const stateAfterExpected = _.cloneDeep(stateBefore);
  stateAfterExpected.screen.current = "startLevel";
  expect(stateAfter).toEqual(stateAfterExpected);
});