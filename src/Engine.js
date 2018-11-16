import {
  Bodies,
  Engine,
  Events,
  Render,
  World
} from 'matter-js'

export function createEngine() {
  const engine = Engine.create();
  engine.world.gravity.y = 0.2;
  const ball = createBall();
  const bar = createBar();
  const walls = createWalls();
  World.add(engine.world, [
    ...walls,
    ball,
    bar
  ]);
  Events.on(engine, 'collisionStart', createCollisionHandler(ball));
  return { engine, bar };
}

export function createRenderer(container, engine) {
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

function createWalls() {
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

function createBar() {
  return Bodies.rectangle(100, 500, 100, 10, {
    isStatic: true,
    friction: 0
  });
}

function createBall() {
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

function createCollisionHandler(ball) {
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