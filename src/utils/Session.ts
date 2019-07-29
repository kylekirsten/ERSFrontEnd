import * as APICall from './APICall';
import config from '../config.json';
import jwt from 'jsonwebtoken';
export async function isValidSession(token : string) : Promise<boolean> {
    const tokenPayload : any = jwt.decode(token);
    const userId = tokenPayload.userId;
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
