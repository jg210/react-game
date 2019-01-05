// @flow
//
// (c) 2018-2019 Jeremy Green

import {
  levelComplete as levelCompleteSaga,
  levelCompleteListener
} from '../levelComplete';
import { put, select, takeEvery } from 'redux-saga/effects';
import _ from 'lodash';

import { LEVEL_COMPLETE } from '../../actionTypes';
import {
  gameComplete,
  levelChange,
  levelComplete as levelCompleteAction,
  startLevel
} from '../../actions';

import { isLastLevel } from '../../selectors';
import { storeFactory } from '../../store';

it(`listens for ${LEVEL_COMPLETE}`, () => {
  const generator = levelCompleteListener();
  expect(generator.next().value).toEqual(takeEvery(LEVEL_COMPLETE, levelCompleteSaga));
  expect(generator.next().done).toBe(true);
});

it('handles levelComplete for last level', () => {
  const generator = levelCompleteSaga();
  expect(generator.next().value).toEqual(select(isLastLevel));
  const lastLevel = true;
  expect(generator.next(lastLevel).value).toEqual(put(gameComplete()));
  expect(generator.next().done).toBe(true);
});

it('handles levelComplete for last level', () => {
  const generator = levelCompleteSaga();
  expect(generator.next().value).toEqual(select(isLastLevel));
  const lastLevel = false;
  expect(generator.next(lastLevel).value).toEqual(put(levelChange()));
  expect(generator.next().value).toEqual(put(startLevel()));
  expect(generator.next().done).toBe(true);
});

it(`handles levelComplete action, testing by dispatching to a redux store instance`, () => {
  const store = storeFactory();
  const stateBefore = store.getState();
  store.dispatch(levelCompleteAction());
  const stateAfter = store.getState();
  const stateAfterExpected = _.cloneDeep(stateBefore);
  stateAfterExpected.level.current = 2;
  stateAfterExpected.screen.current = "startLevel";
  expect(stateAfter).toEqual(stateAfterExpected);
});