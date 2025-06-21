import axios from "axios";

// create axios instance with base url
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default api;