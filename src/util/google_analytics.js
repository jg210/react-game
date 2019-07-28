/* @flow */

import ReactGA from 'react-ga';

export function initializeReactGoogleAnalytics() {
  ReactGA.initialize('__GOOGLE_ANALYTICS_TRACKING_ID__');
  ReactGA.pageview(window.location.pathname + window.location.search); // TODO Move to Screen component or saga.
}

