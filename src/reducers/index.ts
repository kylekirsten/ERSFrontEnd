import { combineReducers } from "redux";
import { authVar } from "./Authentication.reducer";

export interface IAppState {
    userData : object,
};

//Composed state of all substates
//means that to access clickers -> state.cicker.clicks
export interface IState {
    authVar: IAppState
}

export const state = combineReducers<IState>({
    authVar,
})

export default authVar