import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://rush-backend.vercel.app", // Replace with your API's base URL
  withCredentials: true, // This ensures cookies are sent with requests
});

export default axiosInstance;
