import { GameEngine } from '../GameEngine';

it("can be instantiated", () => {
  const container = {};
  const level = 23;
  const levelComplete = jest.fn();
  const scoreUpdate = jest.fn();
  new GameEngine(
    container,
    level,
    levelComplete,
    scoreUpdate); 
});