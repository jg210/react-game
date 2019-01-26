// @flow
//
// (c) 2019 Jeremy Green

import { GameEngine } from '../GameEngine';

it("can be instantiated", () => {
  const container = {};
  const level = 23;
  [true, false].forEach((wireframe: boolean) => {
    const levelComplete = jest.fn();
    const scoreUpdate = jest.fn();
    const gameEngine = new GameEngine(
      //$FlowFixMe - container should be HTMLElement
      container,
      level,
      wireframe,
      levelComplete,
      scoreUpdate);
    expect(gameEngine._isEverythingSleepingOrEscaped()).toBe(false);
    expect(levelComplete).toBeCalledTimes(0);
    expect(scoreUpdate).toBeCalledTimes(0);
    expect(gameEngine.getBodyCount()).toEqual(29);
    expect(gameEngine.getConstraintCount()).toEqual(1);
  });
});