// @flow

import { createSelector } from 'reselect'

import { type LevelState } from '../reducers/level';

const getLevel = (state: { level: LevelState }) => state.level.current;
const getLastLevel = (state: { level: LevelState }) => state.level.last;

export const isLastLevel = createSelector(
  [getLevel, getLastLevel],
  (level: number, lastLevel: number) => {
    return level === lastLevel;
  }
)