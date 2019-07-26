import axios from 'axios';
const location = 'http://localhost:5000';
const GET = async (method : string = 'GET', route: string = '/') => {
    let instance = axios.create({
        headers: {
          common: {        // can be common or any other method
            Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOnsicm9sZUlkIjoiMTAiLCJyb2xlIjoiQURNSU4ifSwiaWF0IjoxNTY0MTY3OTQzLCJleHAiOjE1NjQyNTQzNDN9.dhMRKV34NpmtPW0OiYqIvKEeeES3xGtQW02ZQYJ9p8k',
          }
        }
      });
      const data = await instance.get(location + route).then((response : any) => {
            return generateAppropriateResponse(response);
        })
        .catch(e => {
            console.log(e);
            return new Error(e);
        });

    return data;


}

const Login =  (async (username : string, password: string) => {
  const response : any = await axios.post(location + '/login',
  {
    username: username,
    password: password,
  }).catch((error) => {
  }).finally(()=>{
      return generateAppropriateResponse(response);
    //Need to make this return right thing
  });

});

const generateAppropriateResponse = (response : any) => {
  if(response.status === 401){
    return new Error('You do not have access to this resource');
  }
  if(response.status === 500){
    return new Error('Could not complete request. Internal Server Error');
  }
  if(response.status === 400){
    return new Error('Could not complete request. Passed parameters were invalid');
  }
  if(response.status === 200 || response.status === 201){
    return response.data;
  }
}
export {Login, GET};