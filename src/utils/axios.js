import axios from "axios";
const baseUrl = process.env.REACT_APP_BACKEND_URL;

export const axiosInstance = axios.create({
    baseURL: `${baseUrl}/api/v1`,
});
