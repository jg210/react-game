// @flow

import {
  Body,
  Bodies,
  Constraint,
  World
} from 'matter-js'

import { Util } from './Util';

export class Magnet {

  +body: Body;
  +constraints: Constraint[] = [];
  +height: number;
  +width: number;
  +maxSpeed = 1.3;
  +minX: number;
  +maxX: number;
  +world: World;

  constraintsAttached: boolean = true;
  speed: number = 0;

  // eslint-disable-next-line flowtype/no-weak-types
  constructor(args: Object={}) {
    this.minX = args.minX;
    this.maxX = args.maxX;
    this.world = args.world;
    const x = args.x;
    const y = args.y;
    this.width = args.width;
    this.height = args.height;
    const peakHeight = this.height * 0.2;
    const vertices = [
      { x: -this.width / 2, y: - this.height / 2 },
      { x:               0, y: - this.height / 2 - peakHeight },
      { x:  this.width / 2, y: - this.height / 2 },
      { x:  this.width / 2, y:   this.height / 2},
      { x: -this.width / 2, y:   this.height / 2}
    ];
    this.body = Bodies.fromVertices(x, y, vertices, {
      label: "magnet",
      isStatic: true,
    });
  }

  // Bottom centre coordinates of magnet.
  attachmentPosition() {
    return { x: this.body.position.x, y: this.body.position.y + this.height / 2 };
  }

  // Register the Magnet's matter.js Body with the matter.js World.
  addToWorld() {
    World.add(this.world, this.body);
  }

  // Connect another Body to the Magnet.
  attachToMagnet(other: Body) {
    const constraint: Constraint = Constraint.create({
      bodyA: this.body,
      bodyB: other,
      render: {
        visible: false
      }
    })
    this.constraints.push(constraint);
    if (this.constraintsAttached) {
      World.add(this.world, constraint);
    }
  }

  // Start movement to left.
  left() {
    this.speed = -this.maxSpeed;
  }

  // Start movement to right.
  right() {
    this.speed = this.maxSpeed;
  }

  // Stop movement.
  stop() {
    this.speed = 0;
  }

  // Handle matter.js update callback.
  //
  // dt - time since last update
  update(dt: number) {
    const dx = this.speed * dt;
    const x = Util.clamp(
      this.body.position.x + dx,
      this.minX, this.maxX);
    const y = this.body.position.y;
    Body.setPosition(this.body, { x, y });
  }

  // Turn the magnet on or off.
  toggle() {
    this.attach(!this.constraintsAttached);
  }

  // Turn the magnet on or off.
  attach(attach: boolean) {
    if (attach) {
      if (!this.constraintsAttached) {
        World.add(this.world, this.constraints);
      }
    } else {
      if (this.constraintsAttached) {
        World.remove(this.world, this.constraints);
      }
    }
    this.constraintsAttached = attach;
  }

}