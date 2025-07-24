import axios from "axios";


export default function axiosInstance () {
  return axios.create({
    baseURL: 'http://localhost:3001/api',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });
} 
  // Add a request interceptor
axios.interceptors.request.use(function (config) {
console.log("before request")
  return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  console.log("before response")
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });