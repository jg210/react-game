// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as Sentry from '@sentry/browser';
import App from './components/App';
import { Util } from './util/Util'

// https://www.w3.org/TR/pointerevents/ polyfill.
import 'pepjs';

// Crash reporting - should be configured as early as possible.
const SENTRY_DSN = "__SENTRY_DSN__";
const SENTRY_RELEASE = "__SENTRY_RELEASE__";
// eslint-disable-next-line no-useless-concat
if (SENTRY_DSN !== "__SENTRY" + "_DSN__") {
  Sentry.init({
    dsn: SENTRY_DSN,
    release: SENTRY_RELEASE,
    environment: "production"
  });
}

// https://github.com/liabru/matter-js/issues/559
window.decomp = require('poly-decomp');

const rootElement = Util.nonNull(document.getElementById('root'));
ReactDOM.render(<App />, rootElement);
