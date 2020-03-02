// @flow
//
// (c) 2018-2019 Jeremy Green

import {
  Bodies,
  Body,
  Composite,
  Engine,
  Events,
  Pair,
  Render,
  Sleeping,
  World
} from 'matter-js'
import _ from 'lodash';
import seedrandom from 'seedrandom';

import { Log } from '../util/Log';
import { Magnet } from './Magnet';
import { Util } from '../util/Util';

export class GameEngine {

  +ball: Body;
  +ballImageSize: number = 64; // pixels
  +ballRadius: number;
  +ballHeight: number;
  +ballWidth: number;
  +boxHeight: number;
  +boxWidth: number;
  +container: HTMLElement;
  +engine: Engine;
  +level: number;
  +magnet: Magnet;
  +magnetHeight: number = 15;
  +magnetWidth: number = 50;
  +maxSpeedSquared: number = Math.pow(7, 2);
  +maxAngularVelocity: number = 0.5;
  +levelComplete: () => void;
  // The ids of all the "objects".
  +objectIds: Set<number>;
  // The ids of the "objects" that have not yet been dislodged.
  +objectIdsRemaining: Set<number>;
  +renderer: Render;
  +scoreUpdate: (points: number) => void;
  +walls: Body[];
  +wallThickness: number = 50;

  lastUpdateTimestamp: ?number = null;
  started: boolean = false;
  stopped: boolean = false;
  wireframe: boolean;

  constructor(
    container: HTMLElement,
    level: number,
    wireframe: boolean,
    levelComplete: () => void,
    scoreUpdate: (points: number) => void) {
    
    this._dislodgeCheck = this._dislodgeCheck.bind(this);

    this.levelComplete = levelComplete;
    this.scoreUpdate = scoreUpdate;
    this.level = level;
    this.wireframe = wireframe;
    this.container = container;
    this.boxHeight = container.clientHeight;
    this.boxWidth = container.clientWidth;
    this.engine = Engine.create();
    this.engine.world.gravity.y = 0.2;
    this.engine.enableSleeping = true;
    this.ballRadius = 1.025 * this.ballImageSize / 2.0
    this.ballHeight = this.ballRadius;
    this.ballWidth = this.ballRadius;
    this.magnet = this._createMagnet();
    this.ball = this._createBall(this.magnet);
    const walls = this._createWalls();
    const objects = this._createObjects();
    const objectIds = _.map(objects, (object: Body) => {
      return object.id;
    });
    this.objectIds = new Set(objectIds);
    this.objectIdsRemaining = new Set(objectIds);
    this.magnet.attachToMagnet(this.ball);
    World.add(this.engine.world, [
      ...walls,
      this.ball,
      ...objects
    ]);
    this.magnet.addToWorld();
    Log.info('Body ids:');
    Composite.allBodies(this.engine.world).forEach((body: Body) => {
      Log.info(`${body.id} - ${body.label}`);
    });
    this.renderer = Render.create({
      element: this.container,
      engine: this.engine,
      options: {
        background: "#fafafa",
        width: this.boxWidth,
        height: this.boxHeight
      }
    });
    this.setWireframe(this.wireframe);
  }

  start() {
    if (this.started) {
      throw new Error("already started.");
    }
    if (this.stopped) {
      throw new Error("cannot restart.");
    }
    Events.on(this.engine, 'collisionStart', this._handleCollision);
    Events.on(this.engine, 'beforeUpdate', this._handleBeforeUpdate);
    Engine.run(this.engine);
    Render.run(this.renderer);
    document.addEventListener('keydown', this._handleKeyPress);
    document.addEventListener('keyup', this._handleKeyPress);
    this.renderer.canvas.addEventListener('pointerdown', this._handlePointerEvent);
    this.renderer.canvas.addEventListener('pointermove', this._handlePointerEvent);
    this.renderer.canvas.addEventListener('pointerup', this._handlePointerEvent);
    // The canvas has the touch-action CSS attribute set, but the pepjs polyfill
    // needs a DOM attribute instead: https://github.com/jquery/PEP#touch-action
    this.renderer.canvas["touch-action"] = "none";
    this.container.focus();
    this.started = true;
  }

  stop() {
    if (!this.started) {
      throw new Error("not started.");
    }
    if (this.stopped) {
      throw new Error("already stopped");
    }
    this.renderer.canvas.removeEventListener('pointerup', this._handlePointerEvent);
    this.renderer.canvas.removeEventListener('pointerdown', this._handlePointerEvent);
    this.renderer.canvas.removeEventListener('pointermove', this._handlePointerEvent);
    document.removeEventListener('keydown', this._handleKeyPress);
    document.removeEventListener('keyup', this._handleKeyPress);
    Render.stop(this.renderer);
    Events.off(this.engine, 'collisionStart');
    Events.off(this.engine, 'beforeUpdate');
    this.renderer.canvas.remove();
    this.started = false;
    this.stopped = true;
  }

  _handleCollision = (event: {pairs: Pair[]}) => {
    const that = this;
    const { pairs } = event;
    pairs.forEach((pair: Pair) => {
      [pair.bodyA, pair.bodyB].forEach((body: Body) => {
        Sleeping.set(body, false);
        that._dislodgeCheck(body);
      });
    });
  }

  _dislodgeCheck: (Body => void);
  _dislodgeCheck(body: Body) {
    const dislodged = this.objectIdsRemaining.delete(body.id);
    if (dislodged) {
      Log.debug(`dislodged: ${body.id}`);
      const points = 1;
      this.scoreUpdate(points);
    }
  }

  _handlePointerEvent = (event: PointerEvent) => {
    const rect = this.renderer.canvas.getBoundingClientRect();
    this.magnet.handlePointerEvent(rect, event);
  }

  _handleKeyPress = (event: KeyboardEvent) => {
    if (event.repeat) {
      return;
    }
    if (event.type === "keydown" && event.key === " ") {
      this.magnet.toggle();
    }
    if (event.type === "keydown") {
      if (event.key === 'ArrowLeft') {
        this.magnet.left();
      } else if (event.key === 'ArrowRight') {
        this.magnet.right();
      }
    } else if (event.type === "keyup") {
      this.magnet.stop();
    } else {
      throw new Error(event);
    }
  }

  _handleBeforeUpdate = (event: {timestamp: number}) => {
    const that = this;
    if (this.lastUpdateTimestamp === undefined) {
      throw new Error(); // flow type refinement
    }
    if (!(this.lastUpdateTimestamp === null)) {
      const dt: number = event.timestamp - this.lastUpdateTimestamp;
      this.magnet.update(dt);
    }
    Composite.allBodies(this.engine.world).forEach((body: Body) => {
      // Speed and angular velocity are clamped to reduce chance
      // that ball or object can pass through walls.
      const angularVelocity: number = Util.clamp(body.angularVelocity,
        -this.maxAngularVelocity, this.maxAngularVelocity);
      Body.setAngularVelocity(body, angularVelocity);
      const velocity = body.velocity;
      const speedSquared = velocity.x * velocity.x + velocity.y * velocity.y;
      if (speedSquared > this.maxSpeedSquared) {
        const ratio = Math.sqrt(this.maxSpeedSquared / speedSquared);
        Body.setVelocity(body, {
          x: velocity.x * ratio,
          y: velocity.y * ratio
        });
      }
      // In case an object is fast enough to pass through wall, remove
      // it. Otherwise, it likely falls forever and the level never completes.
      if (!that._insideBox(body) && that.objectIds.has(body.id)) {
        Log.debug(`escaped: ${body.id}`);
        World.remove(that.engine.world, body);
        that._dislodgeCheck(body); // Hopefully never required.
      }
    });
    if (this._isEverythingSleepingOrEscaped()) {
      if (this.objectIdsRemaining.size === 0) {
        this.levelComplete();
      } else {
        this.magnet.setEnabled(true);
      }
    }
    this.lastUpdateTimestamp = event.timestamp;
  }

  _insideBox(body: Body): boolean {
    const x: number = body.position.x;
    const y: number = body.position.y;
    return !(x < 0 || x > this.boxWidth || y < 0 || y > this.boxHeight);
  }

  _isEverythingSleepingOrEscaped() {
    return _.every(this.engine.world.bodies, (body: Body) => {
      return body.isSleeping || !this._insideBox(body);
    });
  }

  _createWalls(): Body[] {
    const wallOptions = {
      isStatic: true,
      render: {
        fillStyle: 'LightGrey'
      }
    };
    // matter.js does positioning using centre of mass...
    const wallTop = Bodies.rectangle(this.boxWidth / 2, 0, this.boxWidth, this.wallThickness, { ...wallOptions, label: "wall - T" });
    const wallBottom = Bodies.rectangle(this.boxWidth / 2, this.boxHeight, this.boxWidth, this.wallThickness, { ...wallOptions, label: "wall - B" });
    const wallRight = Bodies.rectangle(this.boxWidth, this.boxHeight / 2, this.wallThickness, this.boxHeight, { ...wallOptions, label: "wall - R" });
    const wallLeft = Bodies.rectangle(0, this.boxHeight / 2, this.wallThickness, this.boxHeight, { ...wallOptions, label: "wall - L" });
    const walls = [wallTop, wallBottom,  wallRight, wallLeft];
    return walls;
  }

  // Initial x coordinate of magnet and ball.
  _initialX(): number {
    return 0.68 * (this.boxWidth - this.wallThickness / 2) + this.wallThickness / 2
  }

  _createMagnet(): Magnet {
    const xLimit = this.wallThickness / 2 +
      Math.max(this.magnetWidth / 2, this.ballWidth / 2) +
      0.01 * this.boxWidth;
    return new Magnet({
      x: this._initialX(),
      y: this.wallThickness / 2 + 0.01 * this.boxHeight + this.magnetHeight / 2,
      minX: xLimit,
      maxX: this.boxWidth - xLimit,
      width: this.magnetWidth,
      height: this.magnetHeight,
      world: this.engine.world,
      onRelease: () => this.scoreUpdate(-1)});
  }

  _createBall(magnet: Magnet): Body {
    const x = magnet.attachmentPosition().x;
    const y = magnet.attachmentPosition().y + this.ballRadius;
    const ball = Bodies.circle(x, y, this.ballRadius, {
      label: "ball",
      render: {
        sprite: {
          texture: `${process.env.PUBLIC_URL || '/public'}/ball.png`
        }
      },
      restitution: 0.5,
      // density: 1,
      frictionAir: 0,
      frictionStatic: 0,
    });
    return ball;
  }

  _createObjects(): Body[] {
    const random = seedrandom(this.level + 484726723);
    const objects = []
    _.range(0, this.level).forEach((i: number) => {
      const radius = 10 + random() * 15;
      const border = this.wallThickness / 2 + radius;
      const x = border + (random() * (this.boxWidth - 2 * border));
      const y = border + this.magnetHeight + this.ballHeight + (random() * (this.boxHeight - 2 * border - this.magnetHeight - this.ballHeight));
      const object = Bodies.circle(x, y, radius, {
        label: `object ${i}`,
        isStatic: false,
        isSleeping: true
      });
      objects.push(object);
    });
    return objects;
  }

  setWireframe(enabled: boolean) {
    this.wireframe = enabled;
    this.renderer.options.wireframes = enabled;
    this.renderer.options.showSleeping = enabled;
    this.renderer.options.showAngleIndicator = enabled;
  }

  getBodyCount() {
    return Composite.allBodies(this.engine.world).length;
  }

  getConstraintCount() {
    return Composite.allConstraints(this.engine.world).length;
  }

}
