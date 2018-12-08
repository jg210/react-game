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

  attachToMagnet(other: Body) {
    // TODO throw Error if called after addToWorld().
    const constraint: Constraint = Constraint.create({
      bodyA: this.body,
      bodyB: other,
      render: {
        visible: false
      }
    })
    this.constraints.push(constraint);
  }

  addToWorld() {
    World.add(this.world, [this.body, ...this.constraints]);
  }

  toggle() {
    this.attach(!this.constraintsAttached);
  }

  left() {
    this.speed = -this.maxSpeed;
  }

  right() {
    this.speed = this.maxSpeed;
  }

  stop() {
    this.speed = 0;
  }

  update(dt: number) {
    const dx = this.speed * dt;
    const x = Util.clamp(
      this.body.position.x + dx,
      this.minX, this.maxX);
    const y = this.body.position.y;
    Body.setPosition(this.body, { x, y });
  }

  attach(attach: boolean) {
    if (attach) {
      if (!this.constraintsAttached) {
        this.constraints.forEach((constraint: Constraint) => {
          World.add(this.world, constraint);
        }, this);
      }
    } else {
      if (this.constraintsAttached) {
        this.constraints.forEach((constraint: Constraint) => {
          World.remove(this.world, constraint);
        }, this);
      }
    }
    this.constraintsAttached = attach;
  }

}