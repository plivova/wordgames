import axios from "axios";

export const apiInstance = axios.create({
    baseURL: 'https://localhost:7286/api',
    timeout: 1000,
});