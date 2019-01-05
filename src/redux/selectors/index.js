// @flow
//
// (c) 2018-2019 Jeremy Green

import { createSelector } from 'reselect'

import { type LevelState } from '../reducers/level';

type State = { level: LevelState }

const getLevel = (state: State) => state.level.current;
const getLastLevel = (state: State) => state.level.last;

export const isLastLevel = createSelector(
  [getLevel, getLastLevel],
  (level: number, lastLevel: number) => {
    return level === lastLevel;
  }
)