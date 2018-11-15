import React, { Component } from 'react';

import {
  Bodies,
  Engine,
  Render,
  World
} from 'matter-js'

export class Game extends Component {

  constructor() {
    super();
    this.engine = Engine.create();
    const radius = 27;
    const x = 100;
    const y = radius;
    const ball = Bodies.circle(x, y, radius, {
      render: {
        sprite: {
          texture: 'sprite.png'
        }
      },
      restitution: 0.99,
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
    World.add(this.engine.world, [
      ball,
      bar,
      Bodies.rectangle(400, 0, 800, 50, { ...wallOptions }),
      Bodies.rectangle(400, 600, 800, 50, { ...wallOptions }),
      Bodies.rectangle(800, 300, 50, 600, { ...wallOptions }),
      Bodies.rectangle(0, 300, 50, 600, { ...wallOptions })
    ]);
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
    const container = document.getElementById('matter_container')
    this.renderer = Render.create({
      element: container,
      engine: this.engine,
      options: {
        background: "transparent",
        wireframes: false,
        width: 800,
        height: 600
      }
    });
    Engine.run(this.engine);
    Render.run(this.renderer);
  }

  // TODO Stop Render and Engine.

}
