Learning [React](https://reactjs.org/) by writing a very simple game.

[![Build Status](https://travis-ci.org/jg210/react-game.svg?branch=master)](https://travis-ci.org/jg210/react-game)

## The Game

Drop the ball to dislodge the objects.

## Development Build Instructions

Install nodenv and node-build (or use any other way to put correct
version of node on PATH):

* https://github.com/nodenv/nodenv#installation
* https://github.com/nodenv/node-build#installation

Then run this:

```
nodenv install $(cat .node-version)
npm install
npm start
```

View the application using:

http://localhost:3000/

# Release Build Instructions

As above, but instead of running "npm start", run:

```
npm run build
```

## Development Environment

Same as Build Instructions, but also need to:

* Install Visual Studio Code (VSC).

* Accept "workspace recommendations" in VSC to install required plugins.

* Restart VSC after installing plugins, otherwise chrome debugger doesn't work.

* Disable both VSC @builtin TypeScript extensions in VSC preferences.

* Install Google Chrome (for debugging with VSC).

* Install React Developer Tools in Chrome.

