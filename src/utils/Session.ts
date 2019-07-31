import * as APICall from './APICall';
import config from '../config.json';
import jwt from 'jsonwebtoken';
export async function isValidSession(token : string) : Promise<boolean> {
    const retrievedUserData = await APICall.POST(`/reimbursements`);
    if(retrievedUserData instanceof Error){
        if(retrievedUserData.message === config.messages.badToken){
            return false;
        } else {
            return true;
        }
    }
    return true;
}
//Returns a model of User (in backend app)
export async function retrieveSession(token : string) : Promise<any>{
    const tokenPayload : any = jwt.decode(token);
    const userId = tokenPayload.userId;
    if(!userId){
        return false;
    }
    return await APICall.GET(`/users/${userId}`);
}
export function getCurrentUserID() : number {
    const token = window.localStorage.getItem('token') || window.sessionStorage.getItem('token');
    if(token){
        const tokenPayload : any = jwt.decode(token);
        return tokenPayload.userId;
    }
    return 0;
}
