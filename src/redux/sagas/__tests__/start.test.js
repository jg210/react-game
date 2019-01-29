// @flow
//
// (c) 2019 Jeremy Green

import { put, takeEvery } from 'redux-saga/effects';

import { start as startSaga, startListener } from '../start';
import { START } from '../../actionTypes';
import {
  resetScore,
  screenChange
} from '../../actions';

it(`listens for ${START}`, () => {
  const generator = startListener();
  expect(generator.next().value).toEqual(takeEvery(START, startSaga));
  expect(generator.next().done).toBe(true);
});

it('handles start action', () => {
  const generator = startSaga();
  expect(generator.next().value).toEqual(put(resetScore()));
  expect(generator.next().value).toEqual(put(screenChange("start")));
  expect(generator.next().done).toBe(true);
});
