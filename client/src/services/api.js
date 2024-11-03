import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081';

export const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    responseType: 'json'
});

// Add request interceptor to handle authorization
api.interceptors.request.use(
    (config) => {
        const token = Cookies.get('ToDoToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
    (response) => {
        // Ensure response is properly formatted
        if (response.headers['content-type']?.includes('application/json')) {
            return response;
        }
        throw new Error('Invalid response format');
    },
    (error) => {
        if (error.response?.status === 401) {
            Cookies.remove('ToDoToken');
            window.location.href = '/login';
        }
        // Properly format error response
        return Promise.reject({
            status: error.response?.status,
            message: error.response?.data?.message || 'An error occurred',
            data: error.response?.data
        });
    }
);

export const login = async (credentials) => {
    try {
        const response = await api.post('/server/login', credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const signup = async (userData) => {
    try {
        const response = await api.post('/server/user', userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const todo = async () => {
    try {
        const response = await api.get('/server/todo');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8081';

// // axios.defaults.adapter = require('axios/lib/adapters/http');

// export const api = axios.create({
//     baseURL: API_BASE_URL,
//     withCredentials: true, // Send cookies and auth headers with requests
//     headers: {
//         'Content-Type': 'application/json', // Set Content-Type for all requests
//     },
// });

// export const login = (data) => api.post('server/login', data);
// export const signup = (data) => api.post('server/user', data);
// // export const todo = () => api.get('/server/todo');
// export const todo = (token) => 
//     api.get('/server/todo', { headers: { Authorization: `Bearer ${token}` } });


// <?php

// use CodeIgniter\Router\RouteCollection;

// /**
//  * @var RouteCollection $routes
//  */

// // Routers for User
// $routes->post('/server/login', 'UserController::login');
// $routes->post('/server/user', 'UserController::signup'); //create
// // Protect task routes with the 'auth' middleware
// $routes->group('server/user', ['filter' => 'auth'], function($routes) {
//     $routes->get('/', 'UserController::index');     // Protected route
//     $routes->post('(:num)', 'UserController::update/$1');  // Protected route
//     $routes->delete('(:num)', 'UserController::delete/$1');  // Protected route
// });


// // Routers for Todo
// $routes->group('server/todo', ['filter' => 'auth'], function($routes) {
//     $routes->get('/', 'TodoController::index');  // Protected route
//     $routes->post('/', 'TodoController::create');  // Protected route
//     $routes->post('update/(:num)', 'TodoController::update/$1');  // Protected route
//     $routes->post('(:num)', 'TodoController::edit/$1');  // Protected route
//     $routes->delete('(:num)', 'TodoController::delete/$1');  // Protected route
// });


