// @flow
//
// (c) 2018-2019 Jeremy Green

import type { ScreenType } from '../screen';

export const START_GAME = 'START_GAME';
export type StartGameAction = {
  type: typeof(START_GAME)
};

export const LEVEL_COMPLETE = 'LEVEL_COMPLETE';
export type LevelCompleteAction = {
  type: typeof(LEVEL_COMPLETE)
};

export const GAME_COMPLETE = 'GAME_COMPLETE';
export type GameCompleteAction = {
  type: typeof(GAME_COMPLETE)
};

export const LEVEL_CHANGE = 'LEVEL_CHANGE';
export type LevelChangeAction = {
  type: typeof(LEVEL_CHANGE),
  payload: { level: number }
};

export const START_LEVEL = 'START_LEVEL';
export type StartLevelAction = {
  type: typeof(START_LEVEL)
};

export const SCORE_UPDATE = 'SCORE_UPDATE';
export type ScoreUpdateAction = {
  type: typeof(SCORE_UPDATE),
  payload: { points: number }
};

export const SCREEN_CHANGE = 'SCREEN_CHANGE';
export type ScreenChangeAction = {
  type: typeof(SCREEN_CHANGE),
  payload: { screen: ScreenType }
};
