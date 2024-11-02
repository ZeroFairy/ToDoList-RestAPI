import axios from 'axios';

const API_BASE_URL = 'http://localhost:5173';

export const api = axios.create({
    baseURL: API_BASE_URL,
});

export const login = (data) => api.post('/server/login', data);