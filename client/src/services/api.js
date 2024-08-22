import axios from "axios";

const api = axios.create({ baseURL: `http://localhost:1337` });
export const apiBackend = axios.create({ baseURL: `http://localhost:3000` });
export default api;
