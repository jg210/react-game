// @flow

import { startGame, startGameListener } from '../startGame';

import { put, takeEvery } from 'redux-saga/effects';

import { START_GAME } from '../../actionTypes';
import { startLevel } from '../../actions';

it(`listens for ${START_GAME}`, () => {
  const generator = startGameListener();
  expect(generator.next().value).toEqual(takeEvery(START_GAME, startGame));
  expect(generator.next().done).toBe(true);
});

it('handles startGame', () => {
  const generator = startGame();
  expect(generator.next().value).toEqual(put(startLevel()));
  expect(generator.next().done).toBe(true);
});