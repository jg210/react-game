// @flow
//
// (c) 2018-2019 Jeremy Green

import { actionLoggerListener } from './actionLogger';
import { gameCompleteListener } from './gameComplete';
import { levelCompleteListener } from './levelComplete';
import { startListener } from './start';
import { startLevelListener } from './startLevel';
import { startGameListener } from './startGame';

export default [
  actionLoggerListener,
  gameCompleteListener,
  levelCompleteListener,
  startListener,
  startLevelListener,
  startGameListener
];