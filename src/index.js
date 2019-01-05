// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { Util } from './util/Util'

// https://github.com/liabru/matter-js/issues/559
window.decomp = require('poly-decomp');

const rootElement = Util.nonNull(document.getElementById('root'));
ReactDOM.render(<App />, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
