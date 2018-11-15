import React, { Component } from 'react';

import {
  Bodies,
  Engine,
  Events,
  Render,
  World
} from 'matter-js'

export class Game extends Component {

  constructor() {
    super();
    this.renderer = null;
  }

  render() {
    return (
      <div>
        <div id="matter_container" />
      </div>
    );
  }

  componentDidMount() {
    const engine = Engine.create();
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
    const bar = Bodies.rectangle(100, 500, 100, 10, {
      isStatic: true,
      friction: 0
    });
    const wallOptions = {
      isStatic: true,
      friction: 0
    }
    World.add(engine.world, [
      ball,
      bar,
      Bodies.rectangle(400, 0, 800, 50, { ...wallOptions }),
      Bodies.rectangle(400, 600, 800, 50, { ...wallOptions }),
      Bodies.rectangle(800, 300, 50, 600, { ...wallOptions }),
      Bodies.rectangle(0, 300, 50, 600, { ...wallOptions })
    ]);
    Events.on(engine, 'collisionStart', event => {
      event.pairs.forEach(pair => {
        [pair.bodyA, pair.bodyB].forEach(body => {
          if (body === ball) {
            // Collisions in matter.js aren't elastic enough, so
            // invert the velocity when the ball hits something.
            body.velocity.x = -body.velocity.x;
            body.velocity.y = -body.velocity.y;
          }
        });
      });
    });
    const container = document.getElementById('matter_container')
    this.renderer = Render.create({
      element: container,
      engine: engine,
      options: {
        background: "transparent",
        wireframes: false,
        width: 800,
        height: 600
      }
    });
    Engine.run(engine);
    Render.run(this.renderer);
  }

  componentWillUnmount() {
    Render.stop(this.renderer);
    Engine.stop(this.renderer.engine);
    this.renderer = null;
  }

}
