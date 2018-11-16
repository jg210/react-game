import React, { Component } from 'react';

import {
  Bodies,
  Body,
  Engine,
  Events,
  Render,
  World
} from 'matter-js'

export class Game extends Component {

  CONTAINER_ID = "matter_js_container";

  constructor() {
    super();
    this.renderer = null;
    this.bar = null;
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  render() {
    return (
      <div>
        <div id={this.CONTAINER_ID} />
      </div>
    );
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

  componentDidMount() {
    const engine = Engine.create();
    engine.world.gravity.y = 0.2;
    const ball = this.createBall();
    this.bar = this.createBar();
    const walls = this.createWalls();
    World.add(engine.world, [
      ...walls,
      ball,
      this.bar
    ]);
    Events.on(engine, 'collisionStart', this.createCollisionHandler(ball));
    const container = document.getElementById(this.CONTAINER_ID);
    this.renderer = this.createRenderer(container, engine);
    Engine.run(engine);
    Render.run(this.renderer);
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    Render.stop(this.renderer);
    Engine.stop(this.renderer.engine);
    this.renderer = null;
    this.bar = null;
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  createRenderer(container, engine) {
    return Render.create({
      element: container,
      engine: engine,
      options: {
        background: "transparent",
        wireframes: false,
        width: 800,
        height: 600
      }
    });
  }

  createWalls() {
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

  createBar() {
    return Bodies.rectangle(100, 500, 100, 10, {
      isStatic: true,
      friction: 0
    });
  }

  createBall() {
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
          texture: 'sprite.png'
        }
      },
      restitution: 1,
      inertia: ballInertia,
      inverseInertia: 1 / ballInertia,
      friction: 0,
      frictionAir: 0,
      frictionStatic: 0
    });
    return ball;
  }

  createCollisionHandler(ball) {
    return event => {
      event.pairs.forEach(pair => {
        [pair.bodyA, pair.bodyB].forEach(body => {
          if (body === ball) {
            // Collisions in matter.js aren't 100% elastic, so
            // invert the velocity when the ball hits something.
            body.velocity.x = -body.velocity.x;
            body.velocity.y = -body.velocity.y;
          }
        });
      });
    };
  }

}
