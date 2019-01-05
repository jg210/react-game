import { Magnet } from '../Magnet';

it("attachment position", () => {
  const world = {};
  const x = 10;
  const y = 10;
  const height = 5;
  const magnet = new Magnet({
    x: x,
    y: y,
    minX: 5,
    maxX: 20,
    width: 5,
    height: height,
    world: world
  });
  const position = magnet.attachmentPosition();
  expect(position.x).toBeCloseTo(x);
  expect(position.y).toBeCloseTo(y + height / 2.0);
  expect(Object.keys(position)).toEqual(["x", "y"]);
});