// @flow
//
// (c) 2019 Jeremy Green

import {
  Bodies,
  Composite,
  Engine,
  World
} from 'matter-js'

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

it("can be added to World", () => {
  const engine = Engine.create();
  const world = engine.world;
  expect(Composite.allBodies(world).length).toEqual(0);
  const magnet = new Magnet({
    x: 10, y: 10,
    minX: 5, maxX: 20,
    width: 5, height: 5,
    world: world
  });
  magnet.addToWorld();
  expect(Composite.allBodies(world).length).toEqual(1);
});

it("can have things attached to it", () => {
  const engine = Engine.create();
  const world = engine.world;
  expect(Composite.allBodies(world).length).toEqual(0);
  expect(Composite.allConstraints(world).length).toEqual(0);
  const magnet = new Magnet({
    x: 10, y: 10,
    minX: 5, maxX: 20,
    width: 5, height: 5,
    world: world
  });
  magnet.addToWorld();
  expect(Composite.allBodies(world).length).toEqual(1);
  expect(Composite.allConstraints(world).length).toEqual(0);
  const otherBody = Bodies.circle(12, 12, 2, 2);
  World.add(world, otherBody);
  expect(Composite.allBodies(world).length).toEqual(2);
  expect(Composite.allConstraints(world).length).toEqual(0);
  magnet.attachToMagnet(otherBody);
  expect(Composite.allConstraints(world).length).toEqual(1);
  magnet.setEnabled(false);
  expect(Composite.allConstraints(world).length).toEqual(0);
  magnet.setEnabled(false);
  expect(Composite.allConstraints(world).length).toEqual(0);
  magnet.setEnabled(true);
  expect(Composite.allConstraints(world).length).toEqual(1);
  magnet.setEnabled(true);
  expect(Composite.allConstraints(world).length).toEqual(1);
  magnet.toggle();
  expect(Composite.allConstraints(world).length).toEqual(0);
  magnet.toggle();
  expect(Composite.allConstraints(world).length).toEqual(1);
});

it("can have things attached to it when disabled", () => {
  const engine = Engine.create();
  const world = engine.world;
  expect(Composite.allBodies(world).length).toEqual(0);
  expect(Composite.allConstraints(world).length).toEqual(0);
  const magnet = new Magnet({
    x: 10, y: 10,
    minX: 5, maxX: 20,
    width: 5, height: 5,
    world: world
  });
  magnet.addToWorld();
  expect(Composite.allBodies(world).length).toEqual(1);
  expect(Composite.allConstraints(world).length).toEqual(0);
  magnet.setEnabled(false);
  const otherBody = Bodies.circle(12, 12, 2, 2);
  World.add(world, otherBody);
  expect(Composite.allBodies(world).length).toEqual(2);
  expect(Composite.allConstraints(world).length).toEqual(0);
  magnet.attachToMagnet(otherBody);
  expect(Composite.allConstraints(world).length).toEqual(0);
  magnet.setEnabled(false);
  expect(Composite.allConstraints(world).length).toEqual(0);
  magnet.setEnabled(false);
  expect(Composite.allConstraints(world).length).toEqual(0);
  magnet.setEnabled(true);
  expect(Composite.allConstraints(world).length).toEqual(1);
  magnet.setEnabled(true);
  expect(Composite.allConstraints(world).length).toEqual(1);
  magnet.toggle();
  expect(Composite.allConstraints(world).length).toEqual(0);
  magnet.toggle();
  expect(Composite.allConstraints(world).length).toEqual(1);
});

it("moves left", () => {
  const magnet = new Magnet({
    x: 10, y: 10,
    minX: 5, maxX: 20,
    width: 5, height: 5,
    world: {}
  });
  magnet.update(1);
  magnet.left();
  magnet.update(1);
});

it("moves right", () => {
  const magnet = new Magnet({
    x: 10, y: 10,
    minX: 5, maxX: 20,
    width: 5, height: 5,
    world: {}
  });
  magnet.update(1);
  magnet.right();
  magnet.update(1);
});

it("moves left then right", () => {
  const magnet = new Magnet({
    x: 10, y: 10,
    minX: 5, maxX: 20,
    width: 5, height: 5,
    world: {}
  });
  magnet.update(1);
  magnet.left();
  magnet.update(1);
  magnet.right();
  magnet.update(1);
});

it("moves right then left", () => {
  const magnet = new Magnet({
    x: 10, y: 10,
    minX: 5, maxX: 20,
    width: 5, height: 5,
    world: {}
  });
  magnet.update(1);
  magnet.left();
  magnet.update(1);
  magnet.right();
  magnet.update(1);
});

it("stops when already stopped", () => {
  const magnet = new Magnet({
    x: 10, y: 10,
    minX: 5, maxX: 20,
    width: 5, height: 5,
    world: {}
  });
  magnet.update(1);
  magnet.stop();
  magnet.update(1);
});

it("moves left then stops", () => {
  const magnet = new Magnet({
    x: 10, y: 10,
    minX: 5, maxX: 20,
    width: 5, height: 5,
    world: {}
  });
  magnet.update(1);
  magnet.left();
  magnet.update(1);
  magnet.stop();
  magnet.update(1);
});

it("moves right then stops", () => {
  const magnet = new Magnet({
    x: 10, y: 10,
    minX: 5, maxX: 20,
    width: 5, height: 5,
    world: {}
  });
  magnet.update(1);
  magnet.right();
  magnet.update(1);
  magnet.stop();
  magnet.update(1);
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
  magnet.left();
  expect(magnet.attachmentPosition().x).toBeCloseTo(20);
  expect(magnet.getSpeed()).toBeCloseTo(0);
  magnet.update(1);
  expect(magnet.attachmentPosition().x).toBeCloseTo(18);
  expect(magnet.getSpeed()).toBeCloseTo(-2);
  magnet.update(1);
  expect(magnet.attachmentPosition().x).toBeCloseTo(15);
  expect(magnet.getSpeed()).toBeCloseTo(-3);
  magnet.update(1);
  expect(magnet.attachmentPosition().x).toBeCloseTo(12);
  expect(magnet.getSpeed()).toBeCloseTo(-3);
  magnet.update(1);
  expect(magnet.attachmentPosition().x).toBeCloseTo(9);
  expect(magnet.getSpeed()).toBeCloseTo(-3);
  magnet.update(1);
  expect(magnet.attachmentPosition().x).toBeCloseTo(6);
  expect(magnet.getSpeed()).toBeCloseTo(-3);
  magnet.update(1);
  expect(magnet.attachmentPosition().x).toBeCloseTo(5);
  expect(magnet.getSpeed()).toBeCloseTo(-3);
  magnet.update(1);
  expect(magnet.attachmentPosition().x).toBeCloseTo(5);
  expect(magnet.getSpeed()).toBeCloseTo(-3);
  magnet.update(1);
  expect(magnet.attachmentPosition().x).toBeCloseTo(5);
  expect(magnet.getSpeed()).toBeCloseTo(-3);
  magnet.update(1);
  expect(magnet.attachmentPosition().x).toBeCloseTo(5);
  expect(magnet.getSpeed()).toBeCloseTo(-3);
  magnet.update(1);
  expect(magnet.attachmentPosition().x).toBeCloseTo(5);
  expect(magnet.getSpeed()).toBeCloseTo(-3);
  magnet.stop();
  expect(magnet.attachmentPosition().x).toBeCloseTo(5);
  expect(magnet.getSpeed()).toBeCloseTo(0);
});
