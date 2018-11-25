// @flow
import { GAME_OVER, SCORE_UPDATE } from './actionTypes'

export const gameOver = () => ({
  type: GAME_OVER
});

export const scoreUpdate = (points: number) => ({
  type: SCORE_UPDATE,
  payload: {
    points: points
  }
});