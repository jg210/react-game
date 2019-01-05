// @flow
//
// (c) 2018-2019 Jeremy Green

import { gameComplete, gameCompleteListener } from '../gameComplete';

import { put, takeEvery } from 'redux-saga/effects';

import { GAME_COMPLETE } from '../../actionTypes';
import { screenChange } from '../../actions';

it(`listens for ${GAME_COMPLETE}`, () => {
  const generator = gameCompleteListener();
  expect(generator.next().value).toEqual(takeEvery(GAME_COMPLETE, gameComplete));
  expect(generator.next().done).toBe(true);
});

it('handles gameComplete', () => {
  const generator = gameComplete();
  expect(generator.next().value).toEqual(put(screenChange("gameComplete")));
  expect(generator.next().done).toBe(true);
});