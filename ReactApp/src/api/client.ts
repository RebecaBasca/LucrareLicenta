import axios from 'axios';

export const APP_USER = 'tk';
export const BACKEND_URL = "http://localhost:3000";

export const myApp = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: false
});
