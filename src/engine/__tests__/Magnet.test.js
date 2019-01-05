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

it("moves left", () => {
  const magnet = new Magnet({
    x: 10, y: 10,
    minX: 5, maxX: 20,
    width: 5, height: 5,
    world: {}
  });
  magnet.left();
});

it("moves right", () => {
  const magnet = new Magnet({
    x: 10, y: 10,
    minX: 5, maxX: 20,
    width: 5, height: 5,
    world: {}
  });
  magnet.right();
});

it("moves left then right", () => {
  const magnet = new Magnet({
    x: 10, y: 10,
    minX: 5, maxX: 20,
    width: 5, height: 5,
    world: {}
  });
  magnet.left();
  magnet.right();
});

it("moves right then left", () => {
  const magnet = new Magnet({
    x: 10, y: 10,
    minX: 5, maxX: 20,
    width: 5, height: 5,
    world: {}
  });
  magnet.left();
  magnet.right();
});

it("stops when already stopped", () => {
  const magnet = new Magnet({
    x: 10, y: 10,
    minX: 5, maxX: 20,
    width: 5, height: 5,
    world: {}
  });
  magnet.stop();
});

it("moves left then stops", () => {
  const magnet = new Magnet({
    x: 10, y: 10,
    minX: 5, maxX: 20,
    width: 5, height: 5,
    world: {}
  });
  magnet.left();
  magnet.stop();
});

it("moves right then stops", () => {
  const magnet = new Magnet({
    x: 10, y: 10,
    minX: 5, maxX: 20,
    width: 5, height: 5,
    world: {}
  });
  magnet.right();
  magnet.stop();
});

it("accelerates", () => {
  const magnet = new Magnet({
    x: 10, y: 10,
    minX: 5, maxX: 20,
    width: 5, height: 5,
    maxSpeed: 3,
    maxAcceleration: 2,
    world: {}
  });
  expect(magnet.attachmentPosition().x).toBeCloseTo(10);
  expect(magnet.getSpeed()).toBeCloseTo(0);
  magnet.right();
  expect(magnet.attachmentPosition().x).toBeCloseTo(10);
  expect(magnet.getSpeed()).toBeCloseTo(0);
  magnet.update(1);
  expect(magnet.attachmentPosition().x).toBeCloseTo(12);
  expect(magnet.getSpeed()).toBeCloseTo(2);
  magnet.update(1);
  expect(magnet.attachmentPosition().x).toBeCloseTo(15);
  expect(magnet.getSpeed()).toBeCloseTo(3);
  magnet.update(1);
  expect(magnet.attachmentPosition().x).toBeCloseTo(18);
  expect(magnet.getSpeed()).toBeCloseTo(3);
  magnet.update(1);
  expect(magnet.attachmentPosition().x).toBeCloseTo(20);
  expect(magnet.getSpeed()).toBeCloseTo(3);
  magnet.update(1);
  expect(magnet.attachmentPosition().x).toBeCloseTo(20);
  expect(magnet.getSpeed()).toBeCloseTo(3);
  magnet.update(1);
  expect(magnet.attachmentPosition().x).toBeCloseTo(20);
  expect(magnet.getSpeed()).toBeCloseTo(3);
  magnet.update(1);
  expect(magnet.attachmentPosition().x).toBeCloseTo(20);
  expect(magnet.getSpeed()).toBeCloseTo(3);
  magnet.update(1);
  expect(magnet.attachmentPosition().x).toBeCloseTo(20);
  expect(magnet.getSpeed()).toBeCloseTo(3);
});
