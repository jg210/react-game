// @flow
import { combineReducers } from "redux";

import { level } from "./level";
import { score } from "./score";
import { screen } from "./screen";

export default combineReducers({
  level,
  score,
  screen
});