// @flow

import type { ScreenType } from '../screen';

export const START_GAME = 'START_GAME';
export type StartGameAction = {
  type: typeof(START_GAME)
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

export const NEXT_LEVEL = 'NEXT_LEVEL';
export type NextLevelAction = {
  type: typeof(NEXT_LEVEL)
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
