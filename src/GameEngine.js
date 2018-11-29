// @flow
import {
  Bodies,
  Body,
  Composite,
  Contact,
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
  friction: number;
  ballInertia: number;
  level: number;
  container: HTMLElement;
  engine: Engine;
  ball: Body;
  barSpeed: number;
  bar: Body;
  walls: Body[];
  wallIds: Map<number,?number>;
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
    this.barWidth = 100;
    this.barHeight = 10;
    this.friction = 0;
    // Infinite inertia reduces conversion of linear to angular
    // momentum, making ball bounce longer:
    //
    // https://github.com/liabru/matter-js/issues/21#issuecomment-42775549
    this.ballInertia = Infinity;
    this.level = level;
    this.container = this._nonNull(document.getElementById(containerId));
    this.engine = Engine.create();
    this.engine.world.gravity.y = 0.2;
    this.ball = this._createBall();
    this.bar = this._createBar();
    this.barSpeed = 0;
    const { walls, wallIds } = this._createWalls();
    this.walls = walls;
    this.wallIds = wallIds;
    const obstacles = this._createObstacles();
    World.add(this.engine.world, [
      ...walls,
      this.ball,
      this.bar,
      ...obstacles
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
      if (that.wallIds.has(other.id)) {
        const otherId: number = other.id;
        const points: ?number = that.wallIds.get(otherId);
        if (points === null) {
          console.log("game over.");
          this.gameOver();
        } else if (points === undefined) {
          throw new Error(); // Keep flow quiet.
        } else {
          console.log(`points: ${points}`);
          this.scoreUpdate(points);
        }
        const activeContacts = pair.activeContacts;
        this._markCollisionPoints(activeContacts);
      }
    });
  }

  _markCollisionPoints(activeContacts: [Contact]) {
    World.add(this.engine.world, _.map(activeContacts, (contact: Contact) => {
      return Bodies.circle(contact.vertex.x, contact.vertex.y, 2, {
        label: `contact`,
        isStatic: true,
        render: {
          fillStyle: "red"
        },
        collisionFilter: {
          category: this.COLLISION_CATEGORY_MARKERS,
          mask: this.COLLISION_CATEGORY_MARKERS
        },
        friction: this.friction
      });
    }));
  }

  _handleKeyPress = (event: KeyboardEvent) => {
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
    const minX = this.wallThickness / 2 + this.barWidth / 2 + 1;
    const maxX = this.boxWidth - (this.wallThickness / 2 + this.barWidth / 2 + 1);
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

  _createWalls(): { walls: Body[], wallIds: Map<number,?number> } {
    const wallOptions = {
      isStatic: true,
      friction: this.friction
    };
    // matter.js does positioning using centre of mass...
    const wallTop = Bodies.rectangle(this.boxWidth / 2, 0, this.boxWidth, this.wallThickness, { ...wallOptions, label: "wall - T" });
    const wallBottom = Bodies.rectangle(this.boxWidth / 2, this.boxHeight, this.boxWidth, this.wallThickness, { ...wallOptions, label: "wall - B" });
    const wallRight = Bodies.rectangle(this.boxWidth, this.boxHeight / 2, this.wallThickness, this.boxHeight, { ...wallOptions, label: "wall - R" });
    const wallLeft = Bodies.rectangle(0, this.boxHeight / 2, this.wallThickness, this.boxHeight, { ...wallOptions, label: "wall - L" });
    const walls = [wallTop, wallBottom, wallRight, wallLeft];
    // A Map from wall Body id to game points. null means "game over".
    const wallIds = new Map();
    wallIds.set(wallTop.id, 1);
    wallIds.set(wallBottom.id, null);
    wallIds.set(wallRight.id, 1);
    wallIds.set(wallLeft.id, 1);
    return { walls, wallIds };
  }

  // Initial x coordinate of bar and ball.
  _initialX(): number {
    return this.boxWidth / 8 + this.wallThickness / 2
  }

  _createBar(): Body {
    const x = this._initialX();
    const y = 0.8 * this.boxHeight;
    return Bodies.rectangle(x, y, this.barWidth, this.barHeight, {
      label: "bar",
      isStatic: true,
    });
  }

  _createBall(): Body {
    const imageSize = 64; // pixels
    const radius = 1.025 * imageSize / 2.0;
    const x = this._initialX();
    const y = radius + this.wallThickness / 2;
    const ball = Bodies.circle(x, y, radius, {
      label: "ball",
      render: {
        sprite: {
          texture: 'ball.png'
        }
      },
      restitution: 1,
      density: 1,
      inertia: this.ballInertia,
      inverseInertia: 1 / this.ballInertia,
      friction: this.friction,
      frictionAir: 0,
      frictionStatic: 0,
    });
    Body.setVelocity(ball, { x: 0, y: 3 });
    return ball;
  }

  _createObstacles(): Body[] {
    const random = seedrandom(this.level + 484726723);
    const obstacles = []
    _.range(0, this.level * 3).forEach((i: number) => {
      const radius = 10 + random() * 15;
      const border = this.wallThickness / 2 + radius;
      const x = border + (random() * (this.boxWidth - 2 * border));
      const y = border + (0.75 * random() * (this.boxHeight - 2 * border));
      const obstacle = Bodies.circle(x, y, radius, {
        label: `obstacle ${i}`,
        isStatic: random() > 0.5,
        friction: this.friction,
        gravityScale: 0
      });
      obstacles.push(obstacle);
    });
    return obstacles;
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
