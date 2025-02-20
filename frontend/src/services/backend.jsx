import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/";

export const backend = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})
