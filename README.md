A game implemented using [React](https://reactjs.org/), [redux](https://redux.js.org/), [redux-saga](https://redux-saga.js.org/), [reselect](https://github.com/reduxjs/reselect) and [flow](https://flow.org/).

This old project is using some technologies that are no longer the best choice:

| Using | Replacements |
| ------| ------|
| flow | TypeScript |
| [class components](https://react.dev/reference/react/Component) | function components and hooks |
| create-react-app | [vite?](https://vitejs.dev/) |
| redux-saga | https://redux.js.org/usage/side-effects-approaches |
| enzyme | [react testing library](https://testing-library.com/docs/react-testing-library/intro/) |

[![build status](https://github.com/jg210/react-game/actions/workflows/checks.yml/badge.svg)](https://github.com/jg210/react-game/actions/workflows/checks.yml)

## The Game

https://jg210.github.io/react-game/

* Drop the ball and dislodge the objects.
* The game is published using [github actions](https://github.com/jg210/react-game/actions/workflows/checks.yml).
* JavaScript crashes are recorded using [Sentry](https://sentry.io).
* [Google Analytics](https://analytics.google.com/analytics/web/) is used to track use.
* The game uses the [matter.js](http://brm.io/matter-js/) 2D physics engine.

## Development Build Instructions

Install nodenv and node-build into ~/.nodenv (or use any other way to put correct
version of node on PATH):

* https://github.com/nodenv/nodenv#installation
* https://github.com/nodenv/node-build#installation

Then run this:

```
. ./environment
nodenv install $(cat .node-version)
npm install
npm start
```

View the application using:

http://localhost:3000/

## Release Build Instructions

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

## GitHub Actions Configuration

Commits to the master branch are tested and built by CI, then published to sentry and github pages.

Need to configure the following repository secrets in github actions:

* GOOGLE_ANALYTICS_TRACKING_ID - the ID is available from the GA console under Tracking Info > Tracking Code (master branch only)
* SENTRY_AUTH_TOKEN - for uploading release metadata to sentry crash reporting system (master branch only). Settings > Auth Tokens
* SENTRY_ORG - Settings > General Settings > Organization Slug
* SENTRY_DSN - the app's key for uploading crashes to sentry (master branch only) - https://docs.sentry.io/product/sentry-basics/concepts/dsn-explainer/

Need to configure Settings > Pages > Build and deployment > source to GitHub Actions
