/*
 * action types
 */

export const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL';
export const TOGGLE_AUTH_STATUS = 'TOGGLE_AUTH_STATUS';
export const CHECK_AUTH_REQUEST = 'CHECK_AUTH_REQUEST';

export const loginSuccessful =
  (data: any) => (dispatch: any) => {
    dispatch({
        payload: {
            userId : data.userId, userName : data.userName, firstName: data.firstName, 
            lastName: data.lastName, email: data.email, role: data.role
        },
        type: LOGIN_SUCCESSFUL
    });
}
export function toggleAuthStatus() {
  return { type: TOGGLE_AUTH_STATUS }
}
export const checkAuthRequest = () => (dispatch: any) => {
  dispatch({
      payload: {
      },
      type: CHECK_AUTH_REQUEST
  });
}