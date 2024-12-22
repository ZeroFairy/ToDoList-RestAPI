import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json, text/json',
        'Accept': 'application/json, text/json',
    },
    responseType: 'json'
});

export const login = async (credentials) => {
    try {
        const response = await api.post('/server/login', credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const signup = async (formData) => {
    try {
        const response = await axios({
            method: 'POST',
            url: 'http://localhost:8081/api/signup',
            headers: {
                'Content-Type': 'application/json',
            },
            data: formData
        });

        return response.data;
    } catch (error) {
        console.error('Sign Up error:', error);
        if (error.response) {
            throw error.response.data.message;
        } else if (error.request) {
            throw setError('No response from server. Please try again.');
        } else {
            throw setError('An error occurred. Please try again.');
        }
    }

    // try {
    //     const response = await api.post('/server/user', userData);
    //     return response.data;
    // } catch (error) {
    //     throw error;
    // }
};

export const todo = async () => {
    try {
        const response = await api.get('/server/todo');
        return response.data;
    } catch (error) {
        throw error;
    }
};