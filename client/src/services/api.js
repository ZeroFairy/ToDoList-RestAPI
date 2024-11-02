import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081';

export const api = axios.create({
    baseURL: API_BASE_URL,
});

export const login = (data) => api.post('/server/login', data);
export const signup = (data) => api.post('/server/user', data);
export const todo = () => api.get('/server/todo');

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


