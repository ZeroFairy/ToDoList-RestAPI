<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

// Routers for User
$routes->post('/server/login', 'UserController::login');
$routes->post('/server/user', 'UserController::signup'); //create
// Protect task routes with the 'auth' middleware
$routes->group('server/user', ['filter' => 'auth'], function($routes) {
    $routes->get('/', 'UserController::index');     // Protected route
    // $routes->post('/', 'UserController::signup');   // Protected route
    $routes->post('(:num)', 'UserController::update/$1');  // Protected route
    $routes->delete('(:num)', 'UserController::delete/$1');  // Protected route
});


// Routers for Todo
$routes->group('server/todo', ['filter' => 'auth'], function($routes) {
    $routes->get('/', 'TodoController::index');  // Protected route
    $routes->post('/', 'TodoController::create');  // Protected route
    $routes->post('update/(:num)', 'TodoController::update/$1');  // Protected route
    $routes->post('(:num)', 'TodoController::edit/$1');  // Protected route
});


