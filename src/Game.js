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
    this.containerRef = React.createRef();
    this.engine = Engine.create();
    this.renderer = Render.create({
      element: this.containerRef.current,
      engine: this.engine
    });
    const ball = Bodies.circle(50, 50, 10, {
      // render: {
      //   sprite: {
      //     texture: 'sprite.png'
      //   }
      // }
    });
    const box = Bodies.rectangle(0, 0, 100, 100, {
      isStatic: true
    });
    World.add(this.engine.world, [ball, box])
  }

  render() {
    return (
      <div ref={this.containerRef} />
    );
  }

  componentDidMount() {
    Engine.run(this.engine);
    Render.run(this.renderer);
  }

}
