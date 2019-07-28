/* @flow */

import ReactGA from 'react-ga';

export function initializeReactGoogleAnalytics() {
  ReactGA.initialize('__GOOGLE_ANALYTICS_TRACKING_ID__');
}

