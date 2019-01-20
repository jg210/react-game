// @flow
//
// (c) 2018-2019 Jeremy Green

import {
  Body,
  Bodies,
  Bounds,
  Constraint,
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
  +world: World,
  +maxAcceleration?: number,
  +maxSpeed?: number
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
  +world: World;

  acceleration: number = 0;
  enabled: boolean = true;
  speed: number = 0;
  dragging: boolean = false;

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
      render: {
        fillStyle: 'Grey'
      }
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
    if (this.enabled) {
      World.add(this.world, constraint);
    }
  }

  leftButtonPressed(event: PointerEvent) {
    return event.buttons & 1;
  }

  handlePointerEvent(
    canvasRect: { left: number, top: number},
    event: PointerEvent) {
    if (event.type === 'pointerup' && event.button === 0) {
      if (this.dragging) {
        this.toggle();
      }
    }
    if (!this.leftButtonPressed(event)) {
      this.dragging = false;
      return;
    }
    const position = {
      x: event.clientX - canvasRect.left,
      y: event.clientY - canvasRect.top
    };
    const onMagnet = Bounds.contains(this.body.bounds, position);
    if (onMagnet) {
      this.dragging = true;
    }
    if (this.dragging) {
      this.stop();
      Body.setPosition(this.body, { x: position.x, y: this.body.position.y});
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
    this.dragging = false;
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

  // For testing.
  getSpeed(): number {
    return this.speed;
  }

}