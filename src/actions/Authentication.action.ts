import UserProfile from "../models/UserProfile";

/*
 * action types
 */

export const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL'
export const TOGGLE_AUTH_STATUS = 'TOGGLE_AUTH_STATUS'

/*
 * other constants
 */



/*
 * action creators
 */

export function loginSuccessful(userProfile : UserProfile) {
  return { type: LOGIN_SUCCESSFUL, userProfile }
}

export function toggleAuthStatus() {
  return { type: TOGGLE_AUTH_STATUS }
}
