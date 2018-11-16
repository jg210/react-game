import {
  Bodies,
  Body,
  Engine,
  Events,
  Render,
  World
} from 'matter-js'
import _ from 'lodash';
import seedrandom from 'seedrandom';

export class GameEngine {

  constructor(containerId, level, onScoreUpdate) {
    this.boxHeight = 600;
    this.boxWidth = 800;
    this.wallThickness = 50;
    this.barWidth = 100;
    this.barHeight = 10;
    this.level = level;
    this.onScoreUpdate = onScoreUpdate;
    this.container = document.getElementById(containerId);
    this.engine = Engine.create();
    this.engine.world.gravity.y = 0.2;
    const ball = this._createBall();
    this.bar = this._createBar();
    const {walls, wallIds} = this._createWalls();
    this.walls = walls;
    this.wallIds = wallIds;
    const obstacles = this._createObstacles();
    World.add(this.engine.world, [
      ...walls,
      ball,
      this.bar,
      ...obstacles
    ]);
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
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this._handleCollision = this._handleCollision.bind(this);
    Events.on(this.engine, 'collisionStart', this._handleCollision);
  }

  start() {
    Engine.run(this.engine);
    Render.run(this.renderer);
    document.addEventListener('keydown', this._handleKeyPress);
  }

  stop() {
    if (this.engine === null) {
      throw new Error("Already stopped.");
    }
    document.removeEventListener('keydown', this._handleKeyPress);
    Render.stop(this.renderer);
    this.renderer.canvas.remove();
    this.container = null;
    this.engine = null;
    this.renderer = null;
    this.bar = null;
  }

  _handleCollision(event) {
    const that = this;
    const pairs = event.pairs;
    pairs.forEach(pair => {
      [pair.bodyA, pair.bodyB].forEach(body => {
        if (that.wallIds.has(body.id)) {
          that.onScoreUpdate(that.wallIds.get(body.id));
        }
      });
    });
  }

  _handleKeyPress(event) {
    if (this.bar === null) {
      return;
    }
    let deltaX = 0;
    if (event.key === 'ArrowLeft') {
      deltaX = -30;
    } else if (event.key === 'ArrowRight') {
      deltaX = 30;
    }
    if (deltaX !== 0) {
      let x = this.bar.position.x + deltaX;
      const minX = this.wallThickness / 2 + this.barWidth / 2 + 1;
      const maxX = this.boxWidth - (this.wallThickness / 2 + this.barWidth / 2 + 1);
      Body.setPosition(this.bar, {
        x: this._clamp(x, minX, maxX),
        y: this.bar.position.y
      });
    }
  }

  _clamp(x, min, max) {
    if (x < min) {
      x = min;
    }
    if (x > max) {
      x = max;
    }
    return x;
  }

  _createWalls() {
    const wallOptions = {
      isStatic: true,
      friction: 0
    };
    // matter.js does positioning using centre of mass...
    const wallTop =    Bodies.rectangle(this.boxWidth / 2, 0,                  this.boxWidth,      this.wallThickness, { ...wallOptions });
    const wallBottom = Bodies.rectangle(this.boxWidth / 2, this.boxHeight,     this.boxWidth,      this.wallThickness, { ...wallOptions });
    const wallRight =  Bodies.rectangle(this.boxWidth,     this.boxHeight / 2, this.wallThickness, this.boxHeight,     { ...wallOptions });
    const wallLeft =   Bodies.rectangle(0,                 this.boxHeight / 2, this.wallThickness, this.boxHeight,     { ...wallOptions });
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
  _initialX() {
    return this.boxWidth / 8 + this.wallThickness / 2
  }

  _createBar() {
    return Bodies.rectangle(this._initialX(), 0.8 * this.boxHeight, this.barWidth, this.barHeight, {
      isStatic: true,
      friction: 0
    });
  }

  _createBall() {
    const imageSize = 64; // pixels
    const radius = 0.86 * imageSize / 2.0;
    const x = this._initialX();
    const y = radius + this.wallThickness / 2;
    // Infinite inertia reduces conversion of linear to angular
    // momentum, making ball bounce longer:
    //
    // https://github.com/liabru/matter-js/issues/21#issuecomment-42775549
    const ballInertia = Infinity;
    const ball = Bodies.circle(x, y, radius, {
      render: {
        sprite: {
          texture: 'ball.png'
        }
      },
      restitution: 1,
      inertia: ballInertia,
      inverseInertia: 1 / ballInertia,
      friction: 0,
      frictionAir: 0,
      frictionStatic: 0,
    });
    Body.setVelocity(ball, { x: 0, y: 3 });
    return ball;
  }

  _createObstacles() {
    const random = seedrandom(this.level + 484726723);
    const obstacles = []
    _.range(0, this.level).forEach(i => {
      const x = random() * this.boxWidth;
      const y = random() * (0.75 * this.boxHeight);
      const radius = 10 + random() * 15;
      const obstacle = Bodies.circle(x, y, radius, {
        isStatic: true,
        friction: 0
      });
      obstacles.push(obstacle);
    });
    return obstacles;
  }

}