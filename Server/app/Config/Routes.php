<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

$routes->get('/server/user', 'UserController::index');
$routes->post('/server/user', 'UserController::signup');
$routes->post('/server/login', 'UserController::login');
$routes->post('/server/user/(:num)', 'UserController::show/$1');
$routes->delete('/server/user/(:num)', 'UserController::delete/$1');
$routes->put('/server/user/(:num)', 'UserController::update/$1');
$routes->post('/server/user/update/(:num)', 'UserController::update/$1');

// Protect task routes with the 'auth' middleware
$routes->group('tasks', ['filter' => 'auth'], function($routes) {
    $routes->get('/', 'TaskController::index');     // Protected route
    $routes->post('/', 'TaskController::create');   // Protected route
    $routes->put('(:segment)', 'TaskController::update/$1');  // Protected route
    $routes->delete('(:segment)', 'TaskController::delete/$1');  // Protected route
});
