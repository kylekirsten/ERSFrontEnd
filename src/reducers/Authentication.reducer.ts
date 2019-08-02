import {
    LOGIN_SUCCESSFUL,
    TOGGLE_AUTH_STATUS,
    CHECK_AUTH_REQUEST,
    BEGIN_LOGIN,
    LOGIN_FAILED,
    LOGOUT,
    LOST_CONNECTION
  } from '../actions/Authentication.action';
  import {IAuthState} from './index';

const initialState : IAuthState = {
      isVerified : false,
      userProfile: {userId: 0,firstName: 'loading',lastName: 'loading',email: 'loading',
       userName: 'loading', role: {roleId: 0, role: 'loading'}},
      isFetching : false,
      lostConnection : false,
  }
  export const authReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case LOGIN_SUCCESSFUL:
          return { ...state, userProfile : action.payload, isVerified: true, isFetching: false}
        case BEGIN_LOGIN:
          return {...state, isFetching:true}
        case LOGIN_FAILED:
          return {...state, isFetching:false, isVerified:false}
        case TOGGLE_AUTH_STATUS:
            return {...state, isVerified: false }
        case CHECK_AUTH_REQUEST:
            return {...state, loadingNewPoke: true}
        case LOGOUT:
          return {...state, userProfile: {role: {roleId: 0}}, isVerified: false}
        case LOST_CONNECTION:
          return {...state, lostConnection: true}
        default: break;

    }
    return state;
}