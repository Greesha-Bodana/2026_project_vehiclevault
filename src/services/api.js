import axios from "axios";
const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:3000",
  headers: {
    "Content-Type": "application/json"
  }
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("vehiclevault_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
