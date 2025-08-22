// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://health-4b1a.onrender.com/api",
});

export default api;
