import {
    LOGIN_SUCCESSFUL,
    TOGGLE_AUTH_STATUS,
  } from '../actions/Authentication.action';
  import {IAppState} from './index';
const initialState : IAppState = {
    userData : {
        isVerified : false,
        userProfile : null,
    }
  }
  function assignUserData(state = {}, action : any) {
    switch (action.type) {
      case LOGIN_SUCCESSFUL:
        const newState = {...state, userProfile: action.text, isVerified : true};
        return newState
      case TOGGLE_AUTH_STATUS:
          return {...state, isVerified: false}
      default:
        return state
    }
  }
  
 export function authVar(state = initialState, action : any) {
    switch (action.type) {
      case LOGIN_SUCCESSFUL:
        return Object.assign({}, state, {
          userData: assignUserData(state.userData, action)
        })
      case TOGGLE_AUTH_STATUS:
        return Object.assign({}, state, {
          userData: assignUserData(state.userData, action)
        })
      default:
        return state
    }
  }