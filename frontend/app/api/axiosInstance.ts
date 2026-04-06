import axios from "axios";

export const apiInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5238/api',
    timeout: 10000,
});