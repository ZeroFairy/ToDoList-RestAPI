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

export const login = async (formData) => {
    try {
        console.log('Attempting login...');
        const response = await axios({
            method: 'POST',
            url: `${API_BASE_URL}/api/login`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: formData
        });

        console.log('Login response:', response.data);
        return response;
    } catch (error) {
        console.error('Login error:', error);
        if (error.response) {
            setError(error.response.data.message);
        } else if (error.request) {
            setError('No response from server. Please try again.');
        } else {
            setError('An error occurred. Please try again.');
        }
    }
};

export const signup = async (formData) => {
    try {
        const response = await axios({
            method: 'POST',
            url: `${API_BASE_URL}/api/signup`,
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
        console.log('Fetching todos for ID:', id);
        console.log('Using token:', token);
        
        const response = await axios({
            method: 'GET',
            url: `${API_BASE_URL}/api/todo/${id}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        
        console.log('API Response:', response);
        
        return response.data;
    } catch (error) {
        console.error('Detailed error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            config: error.config
        });
        throw error;
    }
};

export const addtodo = async (task, token) => {
    try {
        console.log('Task:', task);
        console.log('Using token:', token);
        
        const response = await axios({
            method: 'POST',
            url: `${API_BASE_URL}/api/todo`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: task
        });
        
        console.log('API Response:', response);
        
        return response.data;
    } catch (error) {
        console.error('Detailed error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            config: error.config
        });
        throw error;
    }
};

export const toggleTodo = async (id, token) => {
    try {
        const response = await axios({
            method: 'POST',
            url: `${API_BASE_URL}/api/todo/${id}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Detailed error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            config: error.config
        });
        throw error;
    }
};

export const deletetodo = async (id, token) => {
    try {
        const response = await axios({
            method: 'DELETE',
            url: `${API_BASE_URL}/api/todo/${id}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Detailed error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            config: error.config
        });
        throw error;
    }
};