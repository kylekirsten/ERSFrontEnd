import { combineReducers } from "redux";
import { authReducer } from "./Authentication.reducer";

export interface IAuthState {
    isVerified : boolean, 
    userProfile : {userId : number, userName: string, firstName : string,
         lastName: string, email: string, role: {roleId : number, role: string}},
    isFetching : boolean,
};

//Access to authorization information should be state.auth....
//User data: state.auth.userData
export interface IAppState {
    auth: IAuthState,
}

export const state = combineReducers<IAppState>({
    auth: authReducer,
})
