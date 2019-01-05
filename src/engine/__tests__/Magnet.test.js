import { Magnet } from '../Magnet';

it("can be instantiated", () => {
  const world = {};
  new Magnet({
    x: 10,
    y: 10,
    minX: 5,
    maxX: 20,
    width: 5,
    height: 5,
    world: world
  });
});