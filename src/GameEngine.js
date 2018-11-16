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
    this.container = document.getElementById(containerId);
    this.engine = Engine.create();
    this.engine.world.gravity.y = 0.2;
    const ball = GameEngine.createBall();
    this.bar = GameEngine.createBar(this.boxHeight);
    const wallThickness = 50;
    const walls = GameEngine.createWalls(this.boxHeight, this.boxWidth, wallThickness);
    const obstacles = GameEngine.createObstacles(this.boxHeight, this.boxWidth, level);
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
  
  static createWalls(boxHeight, boxWidth, wallThickness) {
    const wallOptions = {
      isStatic: true,
      friction: 0
    };
    // matter.js does positioning using centre of mass...
    const walls = [
      Bodies.rectangle(boxWidth / 2, 0,             boxWidth,      wallThickness, { ...wallOptions }), // top
      Bodies.rectangle(boxWidth / 2, boxHeight,     boxWidth,      wallThickness, { ...wallOptions }), // bottom
      Bodies.rectangle(boxWidth,     boxHeight / 2, wallThickness, boxHeight,     { ...wallOptions }), // right
      Bodies.rectangle(0,            boxHeight / 2, wallThickness, boxHeight,     { ...wallOptions })  // left
    ];
    return walls;
  }

  static createBar(boxHeight) {
    return Bodies.rectangle(100, 0.8 * boxHeight, 100, 10, {
      isStatic: true,
      friction: 0
    });
  }

  static createBall() {
    const imageSize = 64; // pixels
    const radius = 0.86 * imageSize / 2.0;
    const x = 100;
    const y = radius;
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

  static createObstacles(boxHeight, boxWidth, n) {
    const random = seedrandom(n);
    const obstacles = []
    _.range(0, n).forEach(i => {
      const x = random() * boxWidth;
      const y = random() * (0.75 * boxHeight);
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