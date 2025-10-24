import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_URL?.replace(/\/+$/, "") || "http://localhost:3000";

const API = axios.create({
  baseURL, // ensures no trailing slash
});

export default API;
