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
  World
} from 'matter-js'
import _ from 'lodash';
import seedrandom from 'seedrandom';

export class GameEngine {

  // http://brm.io/matter-js/docs/classes/Body.html#property_collisionFilter
  COLLISION_CATEGORY_MARKERS = 0x02;

  started: boolean;
  stopped: boolean;
  gameOver: () => void;
  scoreUpdate: (points: number) => void;
  boxHeight: number;
  boxWidth: number;
  wallThickness: number;
  barWidth: number;
  barHeight: number;
  level: number;
  container: HTMLElement;
  engine: Engine;
  ball: Body;
  ballHeight: number;
  ballWidth: number;
  barSpeed: number;
  bar: Body;
  magnetConstraint: ?Constraint;
  walls: Body[];
  renderer: Render;
  _handleKeyPress: (KeyboardEvent) => void;

  constructor(
    containerId: string,
    level: number,
    gameOver: () => void,
    scoreUpdate: (points: number) => void) {
    
    this.started = false;
    this.stopped = false;
    this.gameOver = gameOver;
    this.scoreUpdate = scoreUpdate;
    this.boxHeight = 600;
    this.boxWidth = 800;
    this.wallThickness = 50;
    this.barWidth = 50;
    this.barHeight = 15;
    // this.friction = 0.1;
    // this.ballInertia = 0.1;
    this.level = level;
    this.container = this._nonNull(document.getElementById(containerId));
    this.engine = Engine.create();
    this.engine.world.gravity.y = 0.2;
    this.bar = this._createBar();
    const { ball, ballHeight, ballWidth, magnetConstraint } = this._createBall(this.bar);
    this.ball = ball;
    this.ballHeight = ballHeight;
    this.ballWidth = ballWidth;
    this.magnetConstraint = magnetConstraint;
    this.barSpeed = 0;
    const walls = this._createWalls();
    const objects = this._createObjects();
    World.add(this.engine.world, [
      ...walls,
      this.ball,
      this.bar,
      this.magnetConstraint,
      ...objects
    ]);
    console.log('Body ids:');
    Composite.allBodies(this.engine.world).forEach((body: Body) => {
      console.log(`${body.id} - ${body.label}`);
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
      let ball: Body = null;
      let other: Body = null;
      if (pair.bodyA.id === that.ball.id) {
        ball = pair.bodyA;
        other = pair.bodyB;
      } else if (pair.bodyB.id === that.ball.id) {
        ball = pair.bodyA;
        other = pair.bodyB;
      }
      if (ball === null) {
        return;
      }
      console.log(`ball collided with: ${other.label} [${other.id}]`);
    });
  }

  // _markCollisionPoints(activeContacts: [Contact]) {
  //   World.add(this.engine.world, _.map(activeContacts, (contact: Contact) => {
  //     return Bodies.circle(contact.vertex.x, contact.vertex.y, 2, {
  //       label: `contact`,
  //       isStatic: true,
  //       render: {
  //         fillStyle: "red"
  //       },
  //       collisionFilter: {
  //         category: this.COLLISION_CATEGORY_MARKERS,
  //         mask: this.COLLISION_CATEGORY_MARKERS
  //       }
  //     });
  //   }));
  // }

  _handleKeyPress = (event: KeyboardEvent) => {
    if (event.type === "keydown" && event.key === " " && this.magnetConstraint) {      
      World.remove(this.engine.world, this.magnetConstraint);
      this.magnetConstraint = null;
    }
    if (event.repeat) {
      return;
    }
    const barSpeed = 20;
    if (event.type === "keydown") {
      if (event.key === 'ArrowLeft') {
        this.barSpeed = -barSpeed;
      } else if (event.key === 'ArrowRight') {
        this.barSpeed = barSpeed;
      }
    } else if (event.type === "keyup") {
      this.barSpeed = 0;
    } else {
      throw new Error(event);
    }
    console.log(`bar speed: ${this.barSpeed}`);
  }

  _handleBeforeUpdate = (event: {timestamp: number}) => {
    const xLimit = this.wallThickness / 2 +
      Math.max(this.barWidth / 2, this.ballWidth / 2) +
      0.01 * this.boxWidth;
    const minX = xLimit;
    const maxX = this.boxWidth - xLimit;
    const dx = this.barSpeed; // TODO base on event timestamp.
    const x = this._clamp(
      this.bar.position.x + dx,
      minX, maxX);
    const y = this.bar.position.y;
    Body.setPosition(this.bar, { x, y });
  }

  _clamp(x: number, min: number, max: number): number {
    if (x < min) {
      x = min;
    }
    if (x > max) {
      x = max;
    }
    return x;
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

  // Initial x coordinate of bar and ball.
  _initialX(): number {
    return this.boxWidth / 8 + this.wallThickness / 2
  }

  _createBar(): Body {
    const x = this._initialX();
    const y = this.wallThickness / 2 + 0.01 * this.boxHeight + this.barHeight / 2;
    const w = this.barWidth;
    const h = this.barHeight;
    const peakHeight = h * 0.2;
    const vertices = [
      { x: -w / 2, y: - h / 2 },
      { x:      0, y: - h / 2 - peakHeight },
      { x:  w / 2, y: - h / 2 },
      { x:  w / 2, y:   h / 2},
      { x: -w / 2, y:   h / 2}
    ];
    return Bodies.fromVertices(x, y, vertices, {
      label: "bar",
      isStatic: true,
    });
  }

  _createBall(bar: Body): Body {
    const imageSize = 64; // pixels
    const radius = 1.025 * imageSize / 2.0;
    const x = bar.position.x;
    const y = bar.position.y + this.barHeight / 2 + radius;
    const ball = Bodies.circle(x, y, radius, {
      label: "ball",
      render: {
        sprite: {
          texture: 'ball.png'
        }
      },
      restitution: 1,
      density: 1,
      frictionAir: 0,
      frictionStatic: 0,
    });
    const magnetConstraint = Constraint.create({
      bodyA: bar,
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
    _.range(0, this.level * 3).forEach((i: number) => {
      const radius = 10 + random() * 15;
      const border = this.wallThickness / 2 + radius;
      const x = border + (random() * (this.boxWidth - 2 * border));
      const y = border + this.barHeight + this.ballHeight + (random() * (this.boxHeight - 2 * border - this.barHeight - this.ballHeight));
      const object = Bodies.circle(x, y, radius, {
        label: `object ${i}`,
        isStatic: random() > 0.5,
        gravityScale: 0
      });
      objects.push(object);
    });
    return objects;
  }

  _nonNull<T>(value: ?T): T {
    if (value === null) {
      throw new Error("null value.");
    }
    if (value === undefined) {
      throw new Error("undefined value.");
    }
    return value;
  }

}
