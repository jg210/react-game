// @flow
import {
  Bodies,
  Body,
  Composite,
  Constraint,
  Engine,
  Events,
  Pair,
  Render,
  Sleeping,
  World
} from 'matter-js'
import _ from 'lodash';
import seedrandom from 'seedrandom';

import { Log } from './Log';
import { Util } from './Util';

export class GameEngine {

  +ball: Body;
  +ballHeight: number;
  +ballWidth: number;
  +boxHeight: number = 600;
  +boxWidth: number = 800;
  +container: HTMLElement;
  +engine: Engine;
  +level: number;
  +magnet: Body;
  +magnetConstraint: Constraint;
  +magnetHeight: number = 15;
  +magnetWidth: number = 50;
  +nextLevel: () => void;
  +remainingObjectIds: Set<number>;
  +renderer: Render;
  +scoreUpdate: (points: number) => void;
  +walls: Body[];
  +wallThickness: number = 50;

  lastUpdateTimestamp: ?number = null;
  magnetConstraintAttached: boolean = false;
  magnetSpeed: number = 0;
  started: boolean = false;
  stopped: boolean = false;

  constructor(
    containerId: string,
    level: number,
    nextLevel: () => void,
    scoreUpdate: (points: number) => void) {
    
    this.nextLevel = nextLevel;
    this.scoreUpdate = scoreUpdate;
    this.level = level;
    this.container = Util.nonNull(document.getElementById(containerId));
    this.engine = Engine.create();
    this.engine.world.gravity.y = 0.2;
    this.engine.enableSleeping = true;
    this.magnet = this._createMagnet();
    const { ball, ballHeight, ballWidth, magnetConstraint } = this._createBall(this.magnet);
    this.ball = ball;
    this.ballHeight = ballHeight;
    this.ballWidth = ballWidth;
    this.magnetConstraint = magnetConstraint;
    const walls = this._createWalls();
    const objects = this._createObjects();
    const remainingObjectIds = _.map(objects, (object: Body) => {
      return object.id;
    });
    this.remainingObjectIds = new Set(remainingObjectIds);
    World.add(this.engine.world, [
      ...walls,
      this.ball,
      this.magnet,
      ...objects
    ]);
    this._attachBallToMagnet(true);
    Log.info('Body ids:');
    Composite.allBodies(this.engine.world).forEach((body: Body) => {
      Log.info(`${body.id} - ${body.label}`);
    });
    this.renderer = Render.create({
      element: this.container,
      engine: this.engine,
      options: {
        background: "transparent",
        wireframes: false,
        width: this.boxWidth,
        height: this.boxHeight
      }
    });
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
    document.removeEventListener('keydown', this._handleKeyPress);
    document.removeEventListener('keyup', this._handleKeyPress);
    Render.stop(this.renderer);
    Events.off(this.engine, 'collisionStart');
    Events.off(this.engine, 'beforeUpdate');
    this.renderer.canvas.remove();
    this.started = false;
    this.stopped = true;
  }

  _handleCollision = (event: (pairs: [Pair]) => void) => {
    const that = this;
    const pairs = event.pairs;
    pairs.forEach((pair: Pair) => {
      [pair.bodyA, pair.bodyB].forEach((body: Body) => {
        Sleeping.set(body, false);
        const dislodged = that.remainingObjectIds.delete(body.id);
        if (dislodged) {
          const points = (this.remainingObjectIds.size === 0) ? 10 : 1
          that.scoreUpdate(points);
        }
      });
    });
  }

  _handleKeyPress = (event: KeyboardEvent) => {
    if (event.repeat) {
      return;
    }
    if (event.type === "keydown" && event.key === " ") {
      this._attachBallToMagnet(!this.magnetConstraintAttached);
    }
    const magnetSpeed = 1.3;
    if (event.type === "keydown") {
      if (event.key === 'ArrowLeft') {
        this.magnetSpeed = -magnetSpeed;
      } else if (event.key === 'ArrowRight') {
        this.magnetSpeed = magnetSpeed;
      }
    } else if (event.type === "keyup") {
      this.magnetSpeed = 0;
    } else {
      throw new Error(event);
    }
    Log.info(`magnet speed: ${this.magnetSpeed}`);
  }

  _updateMagnetPosition(dt: number) {
    const xLimit = this.wallThickness / 2 +
      Math.max(this.magnetWidth / 2, this.ballWidth / 2) +
      0.01 * this.boxWidth;
    const minX = xLimit;
    const maxX = this.boxWidth - xLimit;
    const dx = this.magnetSpeed * dt;
    const x = Util.clamp(
      this.magnet.position.x + dx,
      minX, maxX);
    const y = this.magnet.position.y;
    Body.setPosition(this.magnet, { x, y });
  }

  _handleBeforeUpdate = (event: {timestamp: number}) => {
    if (this.lastUpdateTimestamp === undefined) {
      throw new Error(); // flow type refinement
    }
    if (!(this.lastUpdateTimestamp === null)) {
      const dt: number = event.timestamp - this.lastUpdateTimestamp;
      this._updateMagnetPosition(dt);
    }
    if (this._isEverythingSleeping()) {
      if (this.remainingObjectIds.size === 0) {
        this.nextLevel();
      } else {
        this._attachBallToMagnet(true);
      }
    }
    this.lastUpdateTimestamp = event.timestamp;
  }

  _isEverythingSleeping() {
    return _.every(this.engine.world.bodies, (body: Body) => {
      return body.isSleeping;
    });
  }

  _attachBallToMagnet(attach: boolean) {
    if (attach) {
      if (!this.magnetConstraintAttached) {
        World.add(this.engine.world, this.magnetConstraint);
      }
    } else {
      if (this.magnetConstraintAttached) {
        World.remove(this.engine.world, this.magnetConstraint);
      }
    }
    this.magnetConstraintAttached = attach;
  }

  _createWalls(): Body[] {
    const wallOptions = {
      isStatic: true,
    };
    // matter.js does positioning using centre of mass...
    const wallTop = Bodies.rectangle(this.boxWidth / 2, 0, this.boxWidth, this.wallThickness, { ...wallOptions, label: "wall - T" });
    const wallBottom = Bodies.rectangle(this.boxWidth / 2, this.boxHeight, this.boxWidth, this.wallThickness, { ...wallOptions, label: "wall - B" });
    const wallRight = Bodies.rectangle(this.boxWidth, this.boxHeight / 2, this.wallThickness, this.boxHeight, { ...wallOptions, label: "wall - R" });
    const wallLeft = Bodies.rectangle(0, this.boxHeight / 2, this.wallThickness, this.boxHeight, { ...wallOptions, label: "wall - L" });
    const walls = [wallTop, wallBottom, wallRight, wallLeft];
    return walls;
  }

  // Initial x coordinate of magnet and ball.
  _initialX(): number {
    return 0.68 * (this.boxWidth - this.wallThickness / 2) + this.wallThickness / 2
  }

  _createMagnet(): Body {
    const x = this._initialX();
    const y = this.wallThickness / 2 + 0.01 * this.boxHeight + this.magnetHeight / 2;
    const w = this.magnetWidth;
    const h = this.magnetHeight;
    const peakHeight = h * 0.2;
    const vertices = [
      { x: -w / 2, y: - h / 2 },
      { x:      0, y: - h / 2 - peakHeight },
      { x:  w / 2, y: - h / 2 },
      { x:  w / 2, y:   h / 2},
      { x: -w / 2, y:   h / 2}
    ];
    return Bodies.fromVertices(x, y, vertices, {
      label: "magnet",
      isStatic: true,
    });
  }

  _createBall(magnet: Body): Body {
    const imageSize = 64; // pixels
    const radius = 1.025 * imageSize / 2.0;
    const x = magnet.position.x;
    const y = magnet.position.y + this.magnetHeight / 2 + radius;
    const ball = Bodies.circle(x, y, radius, {
      label: "ball",
      render: {
        sprite: {
          texture: 'ball.png'
        }
      },
      restitution: 0.5,
      // density: 1,
      frictionAir: 0,
      frictionStatic: 0,
    });
    const magnetConstraint = Constraint.create({
      bodyA: magnet,
      bodyB: ball,
      render: {
        visible: false
      }
    })
    return {
      ball,
      ballHeight: 2 * radius,
      ballWidth: 2 * radius,
      magnetConstraint
    };
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

}
