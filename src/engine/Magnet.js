// @flow
//
// (c) 2018-2019 Jeremy Green

import {
  Body,
  Bodies,
  Bounds,
  Constraint,
  Engine,
  Mouse,
  MouseConstraint,
  World
} from 'matter-js'

import { Util } from '../util/Util';

type Args = {
  +x: number,
  +y: number,
  +minX: number,
  +maxX: number,
  +width: number,
  +height: number,
  +engine?: Engine,
  +world: World,
  +maxAcceleration?: number,
  +maxSpeed?: number,
  +mouse?: Mouse
}

export class Magnet {

  +body: Body;
  +constraints: Constraint[] = [];
  +height: number;
  +width: number;
  +maxAcceleration: number;
  +maxSpeed: number;
  +minX: number;
  +maxX: number;
  +mouseConstraint: ?MouseConstraint;
  +world: World;

  acceleration: number = 0;
  enabled: boolean = true;
  speed: number = 0;

  constructor(args: Args) {
    const x = args.x;
    const y = args.y;
    this.minX = args.minX;
    this.maxX = args.maxX;
    this.width = args.width;
    this.height = args.height;
    this.world = args.world;
    this.maxAcceleration = (args.maxAcceleration === undefined) ? 0.005 : args.maxAcceleration;
    this.maxSpeed = (args.maxSpeed === undefined) ? 1.3 : args.maxSpeed;
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
    // if (args.mouse) {
    //   this.mouseConstraint = MouseConstraint.create(args.engine, {
    //     mouse: args.mouse,
    //     constraint: {
    //       stiffness: 0.9,
    //       render: {
    //         visible: true
    //       }
    //     }
    //   });
    // }
  }

  // Bottom centre coordinates of magnet.
  attachmentPosition() {
    return { x: this.body.position.x, y: this.body.position.y + this.height / 2 };
  }

  // Register the Magnet the matter.js World.
  addToWorld() {
    World.add(this.world, this.body);
    if (this.mouseConstraint) {
      World.add(this.world, this.mouseConstraint);
    }
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
    if (this.enabled) {
      World.add(this.world, constraint);
    }
  }

  // Start movement to left.
  left() {
    if (this.speed > 0) {
      this.speed = 0;
    }
    this.acceleration = -this.maxAcceleration;
  }

  // Start movement to right.
  right() {
    if (this.speed < 0) {
      this.speed = 0;
    }
    this.acceleration = this.maxAcceleration;
  }

  // Stop movement.
  stop() {
    this.acceleration = 0;
    this.speed = 0;
  }

  // Handle matter.js update callback.
  //
  // dt - time since last update
  update(dt: number) {
    this.speed = Util.clamp(
      this.speed + this.acceleration * dt,
      -this.maxSpeed, this.maxSpeed);
    const dx = this.speed * dt;
    const x = Util.clamp(
      this.body.position.x + dx,
      this.minX, this.maxX);
    const y = this.body.position.y;
    Body.setPosition(this.body, { x, y });
  }

  // Turn the magnet on or off.
  toggle() {
    this.setEnabled(!this.enabled);
  }

  // Turn the magnet on or off.
  setEnabled(enabled: boolean) {
    if (enabled) {
      if (!this.enabled) {
        World.add(this.world, this.constraints);
      }
    } else {
      if (this.enabled) {
        World.remove(this.world, this.constraints);
      }
    }
    this.enabled = enabled;
  }

  handleMouseMove(event) {
    if (this.containsPosition(event.mouse.position) && event.mouse.button == 0) {
      Body.setPosition(this.body, event.mouse.position);
    }
  }

  containsPosition(position): boolean {
    return Bounds.contains(this.body.bounds, position);
  }

  // For testing.
  getSpeed(): number {
    return this.speed;
  }

}