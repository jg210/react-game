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
    this.container = document.getElementById(containerId);
    this.engine = Engine.create();
    this.engine.world.gravity.y = 0.2;
    const ball = GameEngine.createBall();
    this.bar = GameEngine.createBar();
    const walls = GameEngine.createWalls();
    const obstacles = GameEngine.createObstacles(level);
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
        width: 800,
        height: 600
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
      const maxX = 800 - 100;
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

  static createWalls() {
    const wallOptions = {
      isStatic: true,
      friction: 0
    };
    const walls = [
      Bodies.rectangle(400, 0, 800, 50, { ...wallOptions }),
      Bodies.rectangle(400, 600, 800, 50, { ...wallOptions }),
      Bodies.rectangle(800, 300, 50, 600, { ...wallOptions }),
      Bodies.rectangle(0, 300, 50, 600, { ...wallOptions })
    ];
    return walls;
  }

  static createBar() {
    return Bodies.rectangle(100, 500, 100, 10, {
      isStatic: true,
      friction: 0
    });
  }

  static createBall() {
    const radius = 27;
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

  static createObstacles(n) {
    const random = seedrandom(n);
    const obstacles = []
    _.range(0, n).forEach(i => {
      const x = random() * 800;
      const y = random() * (0.8 * 600);
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