// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { Util } from './util/Util'

// https://www.w3.org/TR/pointerevents/ polyfill.
import 'pepjs';

// https://github.com/liabru/matter-js/issues/559
window.decomp = require('poly-decomp');

const rootElement = Util.nonNull(document.getElementById('root'));
ReactDOM.render(<App />, rootElement);
