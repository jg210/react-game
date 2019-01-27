// @flow
//
// (c) 2018-2019 Jeremy Green

import {
  DISMISS_START_LEVEL_SCREEN,
  GAME_COMPLETE,
  LEVEL_COMPLETE,
  LEVEL_CHANGE,
  START_LEVEL,
  SCORE_UPDATE,
  SCREEN_CHANGE,
  TOGGLE_WIREFRAME_MODE,
  START_GAME
} from './actionTypes'
import type { ScreenType } from '../screen';

export const startGame = () => ({
  type: START_GAME
});

export const gameComplete = () => ({
  type: GAME_COMPLETE
});

export const levelComplete = () => ({
  type: LEVEL_COMPLETE
});

export const levelChange = (level: ?number = null) => ({
  type: LEVEL_CHANGE,
  payload: {
    level: level
  }
});

export const startLevel = () => ({
  type: START_LEVEL
});

// Sent if user clicks on start level screen, dismissing
// the screen immediately, not after the usual delay.
export const dismissStartLevelScreen = () => ({
  type: DISMISS_START_LEVEL_SCREEN
});

export const scoreUpdate = (points: number) => ({
  type: SCORE_UPDATE,
  payload: {
    points: points
  }
});

export const toggleWireframeMode = () => ({
  type: TOGGLE_WIREFRAME_MODE,
});

export const screenChange = (screen: ScreenType) => ({
  type: SCREEN_CHANGE,
  payload: {
    screen: screen
  }
});
