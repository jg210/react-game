import {
  Bodies,
  Body,
  Composite,
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
    this.friction = 0;
    // Infinite inertia reduces conversion of linear to angular
    // momentum, making ball bounce longer:
    //
    // https://github.com/liabru/matter-js/issues/21#issuecomment-42775549
    this.ballInertia = Infinity;
    this.level = level;
    this.onScoreUpdate = onScoreUpdate;
    this.container = document.getElementById(containerId);
    this.engine = Engine.create();
    this.engine.world.gravity.y = 0.2;
    this.ball = this._createBall();
    this.bar = this._createBar();
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
    Composite.allBodies(this.engine.world).forEach(body => {
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
    this.ball = null;
  }

  _handleCollision(event) {
    if (this.engine === null) {
      return;
    }
    const that = this;
    const pairs = event.pairs;
    pairs.forEach(pair => {
      let ball = null;
      let other = null;
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
        const points = that.wallIds.get(other.id);
        console.log(`points: ${points}`);
        const activeContacts = pair.activeContacts;
        this._markPoints(activeContacts);
        that.onScoreUpdate(points);
      }
    });
  }

  _markPoints(activeContacts) {
    World.add(this.engine.world, _.map(activeContacts, contact => {
      return Bodies.circle(contact.vertex.x, contact.vertex.y, 2, {
        label: `contact`,
        isStatic: true,
        render: {
          fillStyle: "red"
        },
        collisionFilter: { group: 2 },
        friction: this.friction
      });
    }));
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
  _initialX() {
    return this.boxWidth / 8 + this.wallThickness / 2
  }

  _createBar() {
    return Bodies.rectangle(this._initialX(), 0.8 * this.boxHeight, this.barWidth, this.barHeight, {
      label: "bar",
      isStatic: true,
      friction: this.friction
    });
  }

  _createBall() {
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

  _createObstacles() {
    const random = seedrandom(this.level + 484726723);
    const obstacles = []
    _.range(0, this.level).forEach(i => {
      const radius = 10 + random() * 15;
      const border = this.wallThickness / 2 + radius;
      const x = border + (random() * (this.boxWidth - 2 * border));
      const y = border + (0.75 * random() * (this.boxHeight - 2 * border));
      const obstacle = Bodies.circle(x, y, radius, {
        label: `obstacle ${i}`,
        isStatic: random() > 0.5,
        friction: this.friction
      });
      obstacles.push(obstacle);
    });
    return obstacles;
  }

}