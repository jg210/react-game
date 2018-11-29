// @flow
import { combineReducers } from "redux";
import { level } from "./level";
import { score } from "./score";
import { screen } from "./screen";

export const rootReducer = combineReducers({
  level,
  score,
  screen
});