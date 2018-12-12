import actionLogger from './actionLogger';
import { gameCompleteListener } from './gameComplete';
import levelComplete from './levelComplete';
import startLevel from './startLevel';
import startGame from './startGame';

export default [
  actionLogger,
  gameCompleteListener,
  levelComplete,
  startLevel,
  startGame
];