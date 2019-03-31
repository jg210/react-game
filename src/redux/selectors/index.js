// @flow
//
// (c) 2018-2019 Jeremy Green

import { createSelector } from 'reselect'
import { type StoreState } from '../reducers';

const getLevel = (state: StoreState) => state.level.current;
const getLastLevel = (state: StoreState) => state.level.last;

export const isLastLevel: ( StoreState => boolean) = createSelector(
  [getLevel, getLastLevel],
  (level: number, lastLevel: number) => {
    return level === lastLevel;
  }
)