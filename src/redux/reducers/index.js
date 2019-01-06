// @flow
//
// (c) 2018-2019 Jeremy Green

import { combineReducers } from "redux";

import { debug } from "./debug";
import { level } from "./level";
import { score } from "./score";
import { screen } from "./screen";

export default combineReducers({
  debug,
  level,
  score,
  screen
});