// (c) 2019 Jeremy Green

import { GameEngine } from '../GameEngine';

it("can be instantiated", () => {
  const container = {};
  const level = 23;
  const levelComplete = jest.fn();
  const scoreUpdate = jest.fn();
  const gameEngine = new GameEngine(
    container,
    level,
    levelComplete,
    scoreUpdate);
  expect(gameEngine._isEverythingSleeping()).toBe(false);
  expect(levelComplete).toBeCalledTimes(0);
  expect(scoreUpdate).toBeCalledTimes(0);
  expect(gameEngine.getBodyCount()).toEqual(29);
  expect(gameEngine.getConstraintCount()).toEqual(1);
});