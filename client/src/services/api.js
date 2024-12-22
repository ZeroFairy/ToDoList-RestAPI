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
};

export const gettodo = async (id, token) => {
    try {
        // Add a console.log to debug the URL and token
        console.log('Fetching todos for ID:', id);
        console.log('Using token:', token);
        
        const response = await axios({
            method: 'GET',
            url: `http://localhost:8081/api/todo/${id}`,
            // url: `${API_BASE_URL}/api/todo/${id}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        
        // Add response logging
        console.log('API Response:', response);
        
        return response.data;
    } catch (error) {
        // Enhanced error logging
        console.error('Detailed error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            config: error.config
        });
        throw error;
    }
};

export const addtodo = async (todoData, token) => {
    try {
        const response = await api.post('/api/todo', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: todoData
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updatetodo = async (id, todoData) => {
    try {
        const response = await api.post(`/api/todo/update/${id}`, todoData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deletetodo = async (id) => {
    try {
        const response = await api.delete(`/api/todo/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};