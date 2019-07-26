import axios from 'axios';
const APICall = async (method : string = 'GET', route: string = '/') => {
    const location = 'http://localhost:5000' + route;
    let instance = axios.create({
        headers: {
          common: {        // can be common or any other method
            Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOnsicm9sZUlkIjoiMTAiLCJyb2xlIjoiQURNSU4ifSwiaWF0IjoxNTY0MDc3ODkzLCJleHAiOjE1NjQxNjQyOTN9.miS-dLivGExSgw0fRj36wLrYDAOmVFo_pcJFfNfgPm4',
          }
        }
      });
      const data = await instance.get(location).then((response : any) => {
          console.log(response);
          if(response.status === 401){
              return new Error('You do not have access to this resource');
          }
            return response.data;
        })
        .catch(e => {
            console.log(e);
            return new Error(e);
        });

    return data;


}
export default APICall;