// @flow
//
// (c) 2018-2019 Jeremy Green

import { combineReducers } from "redux";

import { debug, type DebugState } from "./debug";
import { level, type LevelState } from "./level";
import { score, type ScoreState } from "./score";
import { screen, type ScreenState } from "./screen";

// The whole store's state.
export type StoreState = {
  debug: DebugState,
  level: LevelState,
  score: ScoreState,
  screen: ScreenState
}

export default combineReducers({
  debug,
  level,
  score,
  screen
});