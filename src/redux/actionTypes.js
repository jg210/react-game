// @flow

export const SCORE_UPDATE = 'SCORE_UPDATE';
export type ScoreUpdateAction = {
  type: typeof(SCORE_UPDATE),
  payload: { points: number }
};

export const GAME_OVER = 'GAME_OVER';
export type GameOverAction = {
  type: typeof(GAME_OVER)
};