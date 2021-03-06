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

it("has correct attachment position", () => {
  const world = {};
  const x = 10;
  const y = 10;
  const height = 5;
  const onRelease = jest.fn();
  const magnet = new Magnet({
    x,
    y,
    minX: 5,
    maxX: 20,
    width: 5,
    height,
    world,
    onRelease
  });
  const position = magnet.attachmentPosition();
  expect(position.x).toBeCloseTo(x);
  expect(position.y).toBeCloseTo(y + height / 2.0);
  expect(Object.keys(position)).toEqual(["x", "y"]);
  expect(onRelease).toHaveBeenCalledTimes(0);
});

it("can be added to World", () => {
  const engine = Engine.create();
  const world = engine.world;
  expect(Composite.allBodies(world).length).toEqual(0);
  const onRelease = jest.fn();
  const magnet = new Magnet({
    x: 10, y: 10,
    minX: 5, maxX: 20,
    width: 5, height: 5,
    world: world,
    onRelease
  });
  magnet.addToWorld();
  expect(Composite.allBodies(world).length).toEqual(1);
  expect(onRelease).toHaveBeenCalledTimes(0);
});

it("can have things attached to it", () => {
  const engine = Engine.create();
  const world = engine.world;
  expect(Composite.allBodies(world).length).toEqual(0);
  expect(Composite.allConstraints(world).length).toEqual(0);
  const onRelease = jest.fn();
  const magnet = new Magnet({
    x: 10, y: 10,
    minX: 5, maxX: 20,
    width: 5, height: 5,
    world,
    onRelease
  });
  expect(magnet.enabled).toBe(true);
  magnet.addToWorld();
  expect(Composite.allBodies(world).length).toEqual(1);
  expect(Composite.allConstraints(world).length).toEqual(0);
  const otherBody = Bodies.circle(12, 12, 2, 2);
  World.add(world, otherBody);
  expect(Composite.allBodies(world).length).toEqual(2);
  expect(Composite.allConstraints(world).length).toEqual(0);
  magnet.attachToMagnet(otherBody);
  expect(Composite.allConstraints(world).length).toEqual(1);
  expect(magnet.enabled).toBe(true);
  expect(onRelease).toHaveBeenCalledTimes(0);
  magnet.setEnabled(false);
  expect(magnet.enabled).toBe(false);
  expect(onRelease).toHaveBeenCalledTimes(1);
  expect(onRelease).toHaveBeenLastCalledWith();
  expect(Composite.allConstraints(world).length).toEqual(0);
  magnet.setEnabled(false);
  expect(onRelease).toHaveBeenCalledTimes(1);
  expect(Composite.allConstraints(world).length).toEqual(0);
  magnet.setEnabled(true);
  expect(onRelease).toHaveBeenCalledTimes(1);
  expect(Composite.allConstraints(world).length).toEqual(1);
  magnet.setEnabled(true);
  expect(onRelease).toHaveBeenCalledTimes(1);
  expect(Composite.allConstraints(world).length).toEqual(1);
  magnet.toggle();
  expect(onRelease).toHaveBeenCalledTimes(2);
  expect(onRelease).toHaveBeenLastCalledWith();
  expect(Composite.allConstraints(world).length).toEqual(0);
  magnet.toggle();
  expect(onRelease).toHaveBeenCalledTimes(2);
  expect(Composite.allConstraints(world).length).toEqual(1);
  expect(onRelease).toHaveBeenCalledTimes(2);
});

it("can have things attached to it when disabled", () => {
  const engine = Engine.create();
  const world = engine.world;
  expect(Composite.allBodies(world).length).toEqual(0);
  expect(Composite.allConstraints(world).length).toEqual(0);
  const onRelease = jest.fn();
  const magnet = new Magnet({
    x: 10, y: 10,
    minX: 5, maxX: 20,
    width: 5, height: 5,
    world,
    onRelease
  });
  magnet.addToWorld();
  expect(Composite.allBodies(world).length).toEqual(1);
  expect(Composite.allConstraints(world).length).toEqual(0);
  expect(onRelease).toHaveBeenCalledTimes(0);
  magnet.setEnabled(false);
  expect(onRelease).toHaveBeenCalledTimes(1);
  expect(onRelease).toHaveBeenLastCalledWith();
  const otherBody = Bodies.circle(12, 12, 2, 2);
  World.add(world, otherBody);
  expect(Composite.allBodies(world).length).toEqual(2);
  expect(Composite.allConstraints(world).length).toEqual(0);
  magnet.attachToMagnet(otherBody);
  expect(Composite.allConstraints(world).length).toEqual(0);
  magnet.setEnabled(false);
  expect(onRelease).toHaveBeenCalledTimes(1);
  expect(Composite.allConstraints(world).length).toEqual(0);
  magnet.setEnabled(false);
  expect(onRelease).toHaveBeenCalledTimes(1);
  expect(Composite.allConstraints(world).length).toEqual(0);
  magnet.setEnabled(true);
  expect(onRelease).toHaveBeenCalledTimes(1);
  expect(Composite.allConstraints(world).length).toEqual(1);
  magnet.setEnabled(true);
  expect(onRelease).toHaveBeenCalledTimes(1);
  expect(Composite.allConstraints(world).length).toEqual(1);
  magnet.toggle();
  expect(onRelease).toHaveBeenCalledTimes(2);
  expect(onRelease).toHaveBeenLastCalledWith();
  expect(Composite.allConstraints(world).length).toEqual(0);
  magnet.toggle();
  expect(onRelease).toHaveBeenCalledTimes(2);
  expect(Composite.allConstraints(world).length).toEqual(1);
  expect(onRelease).toHaveBeenCalledTimes(2);
});

it("moves left", () => {
  const onRelease = jest.fn();
  const magnet = new Magnet({
    x: 10, y: 10,
    minX: 5, maxX: 20,
    width: 5, height: 5,
    world: {},
    onRelease
  });
  magnet.update(1);
  magnet.left();
  magnet.update(1);
  expect(onRelease).toHaveBeenCalledTimes(0);
});

it("moves right", () => {
  const onRelease = jest.fn();
  const magnet = new Magnet({
    x: 10, y: 10,
    minX: 5, maxX: 20,
    width: 5, height: 5,
    world: {},
    onRelease
  });
  magnet.update(1);
  magnet.right();
  magnet.update(1);
  expect(onRelease).toHaveBeenCalledTimes(0);
});

it("moves left then right", () => {
  const onRelease = jest.fn();
  const magnet = new Magnet({
    x: 10, y: 10,
    minX: 5, maxX: 20,
    width: 5, height: 5,
    world: {},
    onRelease
  });
  magnet.update(1);
  magnet.left();
  magnet.update(1);
  magnet.right();
  magnet.update(1);
  expect(onRelease).toHaveBeenCalledTimes(0);
});

it("moves right then left", () => {
  const onRelease = jest.fn();
  const magnet = new Magnet({
    x: 10, y: 10,
    minX: 5, maxX: 20,
    width: 5, height: 5,
    world: {},
    onRelease
  });
  magnet.update(1);
  magnet.left();
  magnet.update(1);
  magnet.right();
  magnet.update(1);
  expect(onRelease).toHaveBeenCalledTimes(0);
});

it("stops when already stopped", () => {
  const onRelease = jest.fn();
  const magnet = new Magnet({
    x: 10, y: 10,
    minX: 5, maxX: 20,
    width: 5, height: 5,
    world: {},
    onRelease
  });
  magnet.update(1);
  magnet.stop();
  magnet.update(1);
  expect(onRelease).toHaveBeenCalledTimes(0);
});

it("moves left then stops", () => {
  const onRelease = jest.fn();
  const magnet = new Magnet({
    x: 10, y: 10,
    minX: 5, maxX: 20,
    width: 5, height: 5,
    world: {},
    onRelease
  });
  magnet.update(1);
  magnet.left();
  magnet.update(1);
  magnet.stop();
  magnet.update(1);
  expect(onRelease).toHaveBeenCalledTimes(0);
});

it("moves right then stops", () => {
  const onRelease = jest.fn();
  const magnet = new Magnet({
    x: 10, y: 10,
    minX: 5, maxX: 20,
    width: 5, height: 5,
    world: {},
    onRelease
  });
  magnet.update(1);
  magnet.right();
  magnet.update(1);
  magnet.stop();
  magnet.update(1);
  expect(onRelease).toHaveBeenCalledTimes(0);
});

it("accelerates", () => {
  const onRelease = jest.fn();
  const magnet = new Magnet({
    x: 10, y: 10,
    minX: 5, maxX: 20,
    width: 5, height: 5,
    maxSpeed: 3,
    maxAcceleration: 2,
    world: {},
    onRelease
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
  expect(onRelease).toHaveBeenCalledTimes(0);
});
