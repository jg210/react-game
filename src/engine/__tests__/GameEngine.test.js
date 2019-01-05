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
});