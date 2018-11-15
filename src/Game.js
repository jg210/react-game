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
    const ball = Bodies.circle(50, 50, 64, {
      render: {
        sprite: {
          texture: 'sprite.png'
        }
      }
    });
    // const box = Bodies.rectangle(0, 0, 1000, 1000, {
    //   isStatic: true
    // });
    World.add(this.engine.world, [
      ball,
      //box
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
        wireframes: false
      }
    });
    Engine.run(this.engine);
    Render.run(this.renderer);
  }

  // TODO Stop Render and Engine.

}
