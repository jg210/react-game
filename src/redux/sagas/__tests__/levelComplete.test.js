// @flow

import { levelComplete, levelCompleteListener } from '../levelComplete';

import { put, select, takeEvery } from 'redux-saga/effects';

import { LEVEL_COMPLETE } from '../../actionTypes';
import { gameComplete, levelChange, startLevel } from '../../actions';
import { isLastLevel } from '../../selectors';

it(`listens for ${LEVEL_COMPLETE}`, () => {
  const generator = levelCompleteListener();
  expect(generator.next().value).toEqual(takeEvery(LEVEL_COMPLETE, levelComplete));
  expect(generator.next().done).toBe(true);
});

it('handles levelComplete for last level', () => {
  const generator = levelComplete();
  expect(generator.next().value).toEqual(select(isLastLevel));
  const lastLevel = true;
  expect(generator.next(lastLevel).value).toEqual(put(gameComplete()));
  expect(generator.next().done).toBe(true);
});

it('handles levelComplete for last level', () => {
  const generator = levelComplete();
  expect(generator.next().value).toEqual(select(isLastLevel));
  const lastLevel = false;
  expect(generator.next(lastLevel).value).toEqual(put(levelChange()));
  expect(generator.next().value).toEqual(put(startLevel()));
  expect(generator.next().done).toBe(true);

});