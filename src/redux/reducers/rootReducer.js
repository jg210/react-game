// @flow
import { combineReducers } from "redux";
import { level } from "./level";
import { score } from "./score";

export const rootReducer = combineReducers({ level, score });