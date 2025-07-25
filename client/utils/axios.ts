import axios from "axios";
import getAllCookies from "@/utils/gettAllCookies";
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 1000,
});


// Request interceptor - you can add logging or modify requests
axiosInstance.interceptors.request.use(
  function (config) {
const cookies=getAllCookies()
const token=cookies["accessToken"]
if (token) {
  config.headers.Authorization = `Bearer ${token}`;
  console.log(token)
}
else{console.log("no token found")}

    return config;
  }, 
  function (error) {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor - handle responses and errors
axiosInstance.interceptors.response.use(
  function (response) {

    if (response.headers['authorization']) {
      console.log("🔑 Server sent authorization header:", response.headers["authorization"]);
    }
    
    console.log("Success response:", response.status);
    return response;
  }, 
  function (error) {
    console.error("Response error:", error.response?.status, error.message);
    
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.log("User not authenticated");
      // Redirect to login or handle accordingly
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;