/* @flow */

import ReactGA from 'react-ga';
import ScreenType from '../screen'
import { Log } from './Log';
import { cookieConsentGiven } from './cookies';

export function initializeReactGoogleAnalytics(initialScreen: ScreenType) {
  ReactGA.initialize('__GOOGLE_ANALYTICS_TRACKING_ID__');
  pageview(initialScreen, true);
}

export function pageview(screen: ScreenType, consentGiven: ?boolean) {
  const page = window.location.pathname + screen;
  Log.info(() => "GA page: " + page);
  // Cookie isn't set when CookieConsent component calls onAccept callback, so
  // need to use consentGiven to override cookieConsentGiven().
  if (consentGiven === undefined) {
    consentGiven = cookieConsentGiven();
  }
  if (consentGiven) {
    ReactGA.set({page: page});
    ReactGA.pageview(page);
  } else {
    Log.info("GA pageview not sent since cookie consent not given.");
  }
}