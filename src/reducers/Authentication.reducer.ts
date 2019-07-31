import {
    LOGIN_SUCCESSFUL,
    TOGGLE_AUTH_STATUS,
    CHECK_AUTH_REQUEST
  } from '../actions/Authentication.action';
  import {IAuthState} from './index';

const initialState : IAuthState = {
      isVerified : false,
      userProfile: {userId: 0,firstName: 'loading',lastName: 'loading',email: 'loading',
       userName: 'loading', role: {roleId: 0, role: 'loading'}},
      isFetching : false,
  }
  export const authReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case LOGIN_SUCCESSFUL:
          return { ...state, userProfile : action.payload, isVerified: true, isFetching: false}
        case TOGGLE_AUTH_STATUS:
            return {...state, isVerified: false }
        case CHECK_AUTH_REQUEST:
            return {...state, loadingNewPoke: true}
        default: break;
    }
    return state;
}