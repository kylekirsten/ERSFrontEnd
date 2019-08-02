import * as APICall from './APICall';
import config from '../config.json';
import jwt from 'jsonwebtoken';
import axios from 'axios';
export async function isValidSession(token : string) : Promise<any> {
    let instance = axios.create({
        headers: {
          common: {
            Authorization: token,
          }
        }
      });
    const retrievedUserData : any = await instance.post(`${config.backend.serverURL}/reimbursements`).catch((error) =>{
        if(!error['response']){
            return new Error;
        }
        if(error.response.data['message'] === config.serverMessages.invalidToken){
            return false;
        }
        return true;
    }).then((result) => {
        return result;
    });
    console.log(await retrievedUserData);
    return await retrievedUserData;
}
//Returns a model of User (in backend app)
export async function retrieveSession(token : string) : Promise<any>{
    const tokenPayload : any = jwt.decode(token);
    if(!tokenPayload){
        return new Error;
    }
    const userId = tokenPayload['userId'];
    if(!userId){
        return new Error;
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
export function endSession() : void {
    try{
        window.localStorage.removeItem('token');
        window.sessionStorage.removeItem('token');
    }catch{

    }
}