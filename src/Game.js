import React, { Component } from 'react';
import {
  Body,
  Engine,
  Render,
} from 'matter-js'
import { createEngine, createRenderer } from './Engine';

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
    const { engine, bar } = createEngine();
    this.bar = bar;
    const container = document.getElementById(this.CONTAINER_ID);
    this.renderer = createRenderer(container, engine);
    Engine.run(engine);
    Render.run(this.renderer);
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
    Render.stop(this.renderer);
    Engine.stop(this.renderer.engine);
    this.renderer = null;
    this.bar = null;
  }

}
