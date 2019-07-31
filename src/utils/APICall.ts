import axios from 'axios';
import config from '../config.json';
let instance = axios.create({
  headers: {
    common: {
      Authorization: window.localStorage.getItem('token'),
    }
  }
});
const GET = async (route: string = '/') => {
      const data = await instance.get(config.backend.serverURL + route).then((response : any) => {
          return response;
        })
        .catch((error) => {
          return error.response;
        });
        return generateAppropriateResponse(await data,false);
}
const POST = async (route: string = '/', data : any = {}) => {
  //Should modify to use request.body instead of request.params
  let fullUrl = config.backend.serverURL + route + '?';
  //Generate appropriate Url
  Object.keys(data).forEach(key => {
    fullUrl += `${key}=${data[key as any]}&`;
  });
  fullUrl = fullUrl.substring(0,fullUrl.length - 1)
  const responseData = await instance.post(fullUrl).catch((error) => {
    return error.response;
  });
  let isLogin =  route === '/login' ? true : false;
  return generateAppropriateResponse(await responseData, isLogin);
    
}
const Login =  (async (username : string, password: string) => {
  return await POST('/login', {username: username, password: password});
});
const PATCH = async (route: string = '/', data : any = {}) => {
  //Should modify to use request.body instead of request.params
  let fullUrl = config.backend.serverURL + route + '?';
  //Generate appropriate Url
  Object.keys(data).forEach(key => {
    fullUrl += `${key}=${data[key as any]}&`;
  });
  fullUrl = fullUrl.substring(0,fullUrl.length - 1);
  const responseData = await instance.patch(fullUrl).catch((error) => {
    return error.response;
  });
  return generateAppropriateResponse(await responseData, false);
}
const generateAppropriateResponse = (response : any, login : boolean) => {
  if(!response){
    return new Error(config.messages.noServerResponse);
  }
  if(response.status === 401){
    switch(response.message){
      case config.serverMessages.invalidToken:
        return new Error(config.messages.badToken);
      case config.serverMessages.unAuthorized:
        return new Error(config.messages.noAccess)
    }
  }
  if(response.status === 500){
    return new Error(config.messages.internalServerError);
  }
  if(response.status === 400){
    console.log(response);
    //If this function is called from login function, send back invalid credentials message instead
    //of bad request. More user friendly.
    if(login){
      return new Error(config.messages.invalidCredentials);
    } else {
      return new Error(response.data);
    }
  }
  if(response.status === 404){
    return new Error(config.messages.notFound);
  }
  if(response.status === 200 || response.status === 201){
    return response.data;
  }
}
export {Login, GET, POST, PATCH};