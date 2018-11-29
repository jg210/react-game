// @flow
import {
  GAME_OVER,
  LEVEL_CHANGE,
  SCORE_UPDATE,
  SCREEN_CHANGE
} from './actionTypes'
import type { ScreenType } from '../screen';

export const gameOver = () => ({
  type: GAME_OVER
});

export const levelChange = (level: number) => ({
  type: LEVEL_CHANGE,
  payload: {
    level: level
  }
});

export const scoreUpdate = (points: number) => ({
  type: SCORE_UPDATE,
  payload: {
    points: points
  }
});

export const screenChange = (screen: ScreenType) => ({
  type: SCREEN_CHANGE,
  payload: {
    screen: screen
  }
});