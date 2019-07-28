// @flow

import { Cookies } from 'react-cookie-consent';

export const COOKIE_CONSENT = "CookieConsent";

export function cookieConsentGiven(): boolean {
  return Cookies.get(COOKIE_CONSENT) === "true";
}