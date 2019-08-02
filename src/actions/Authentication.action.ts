import * as Session from '../utils/Session';
/*
 * action types
 */

export const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL';
export const TOGGLE_AUTH_STATUS = 'TOGGLE_AUTH_STATUS';
export const CHECK_AUTH_REQUEST = 'CHECK_AUTH_REQUEST';
export const BEGIN_LOGIN = 'BEGIN_LOGIN';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';
export const LOST_CONNECTION = 'LOST_CONNECTION';
export const AUTH_TIMER_START = 'AUTH_TIMER_START';
export const AUTH_TIMER_TICK = 'AUTH_TIMER_TICK';
export const AUTH_TIMER_STOP = 'AUTH_TIMER_STOP';
export const SESSION_CHECK_START = 'SESSION_CHECK_START';
export const loginSuccessful = (data: any) => (dispatch: any) => {
    dispatch({
        payload: {
            userId : data.userId, userName : data.userName, firstName: data.firstName, 
            lastName: data.lastName, email: data.email, role: data.role
        },
        type: LOGIN_SUCCESSFUL
    });
}
export function beginLogin(){
  return {type: BEGIN_LOGIN}
}
export function toggleAuthStatus() {
  return { type: TOGGLE_AUTH_STATUS }
}
export function logout(){
  return {type: LOGOUT}
}
export function loginFailed(){
  return {type: LOGIN_FAILED}
}
export function lostConnection(){
  return {type: LOST_CONNECTION}
}
let timer : any = null;
export const authTimerStart = () => (dispatch: any) => {

}
export function authTimerTick(){
  let token = window.localStorage.getItem('token') || window.sessionStorage.getItem('token');
  return async (dispatch : any) => {
    dispatch(sessionCheckStart());
  if(token){
      let isValid = await Session.isValidSession(token);
      if(!isValid) {
       dispatch(loginFailed()) 
    } else if(isValid instanceof Error) {
      dispatch(lostConnection());
  } else {
  }
  }
  }
}
export function authTimerStop() {

}
const sessionCheckStart = () => ({
  type: SESSION_CHECK_START,
});
export const checkAuthRequest = () => (dispatch: any) => {
  dispatch({
      payload: {
      },
      type: CHECK_AUTH_REQUEST
  });
}