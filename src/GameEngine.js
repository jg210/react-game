import {
  Bodies,
  Body,
  Engine,
  Render,
  World
} from 'matter-js'
import _ from 'lodash';
import seedrandom from 'seedrandom';

export class GameEngine {

  constructor(containerId, level) {
    this.boxHeight = 600;
    this.boxWidth = 800;
    this.wallThickness = 50;
    this.level = level;
    this.container = document.getElementById(containerId);
    this.engine = Engine.create();
    this.engine.world.gravity.y = 0.2;
    const ball = this.createBall();
    this.bar = this.createBar();
    const walls = this.createWalls();
    const obstacles = this.createObstacles();
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
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  start() {
    Engine.run(this.engine);
    Render.run(this.renderer);
    document.addEventListener('keydown', this.handleKeyPress);
  }

  stop() {
    if (this.engine === null) {
      throw new Error("Already stopped.");
    }
    document.removeEventListener('keydown', this.handleKeyPress);
    Render.stop(this.renderer);
    this.renderer.canvas.remove();
    this.container = null;
    this.engine = null;
    this.renderer = null;
    this.bar = null;
  }

  handleKeyPress(event) {
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
      const minX = 100;
      const maxX = this.boxWidth - 100;
      Body.setPosition(this.bar, {
        x: this.clamp(x, minX, maxX),
        y: this.bar.position.y
      });
    }
  }

  clamp(x, min, max) {
    if (x < min) {
      x = min;
    }
    if (x > max) {
      x = max;
    }
    return x;
  }
  
  createWalls() {
    const wallOptions = {
      isStatic: true,
      friction: 0
    };
    // matter.js does positioning using centre of mass...
    const walls = [
      Bodies.rectangle(this.boxWidth / 2, 0,                  this.boxWidth,      this.wallThickness, { ...wallOptions }), // top
      Bodies.rectangle(this.boxWidth / 2, this.boxHeight,     this.boxWidth,      this.wallThickness, { ...wallOptions }), // bottom
      Bodies.rectangle(this.boxWidth,     this.boxHeight / 2, this.wallThickness, this.boxHeight,     { ...wallOptions }), // right
      Bodies.rectangle(0,                 this.boxHeight / 2, this.wallThickness, this.boxHeight,     { ...wallOptions })  // left
    ];
    return walls;
  }

  // Initial x coordinate of bar and ball.
  initialX() {
    return this.boxWidth / 8 + this.wallThickness / 2
  }

  createBar() {
    return Bodies.rectangle(this.initialX(), 0.8 * this.boxHeight, 100, 10, {
      isStatic: true,
      friction: 0
    });
  }

  createBall() {
    const imageSize = 64; // pixels
    const radius = 0.86 * imageSize / 2.0;
    const x = this.initialX();
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

  createObstacles() {
    const random = seedrandom(this.level);
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