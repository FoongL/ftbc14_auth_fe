import axios from "axios";
import { jwtDecode } from "jwt-decode";
/**
 *
 * axios.get
 * axios.post
 *
 *
 *
 */

const apiRequest = axios.create({
  baseURL: "http://localhost:8888/", // should use ENV
  headers: {
    Authorization: "MY AUTH TOKEN GOES HERE",
  },
});

// apiRequest.interceptors.response.use((response)=>{
//     return response
// })

apiRequest.interceptors.request.use(
  async(request) => {
    console.log("hello I am your interceptor");

    // 1. grab my token auth token from localhost
    // 2. use jwt.decode to GRAB the information from inside 
    // 3. if it is NOT expired, just return the request
    // 4. if it IS expired, make a refresh request
    
    const decoded = jwtDecode(localStorage.getItem('accessToken'));
    console.log(decoded)
    const date = new Date(decoded.exp)
    if (date <= new Date()){
        console.log('I need a new token')

        // make axios call to get new token 


    }
    console.log(date)
    return request;
  },
  (error) => {
    console.log("something went wrong");
    return error;
  }
);

export default apiRequest;
