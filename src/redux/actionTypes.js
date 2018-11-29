// @flow

import type { ScreenType } from '../screen';

export const GAME_OVER = 'GAME_OVER';
export type GameOverAction = {
  type: typeof(GAME_OVER)
};

export const LEVEL_CHANGE = 'LEVEL_CHANGE';
export type LevelChangeAction = {
  type: typeof(LEVEL_CHANGE),
  payload: { level: number }
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
