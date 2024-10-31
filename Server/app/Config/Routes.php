<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

// $routes->get('/server/user', 'UserController::index');
// $routes->post('/server/user/(:num)', 'UserController::show/$1');
// $routes->delete('/server/user/(:num)', 'UserController::delete/$1');
// $routes->put('/server/user/(:num)', 'UserController::update/$1');
// $routes->post('/server/user/update/(:num)', 'UserController::update/$1');

$routes->post('/server/login', 'UserController::login');
$routes->post('/server/user', 'UserController::signup'); //create

// Protect task routes with the 'auth' middleware
$routes->group('server/user', ['filter' => 'auth'], function($routes) {
    $routes->get('/', 'UserController::index');     // Protected route
    // $routes->post('/', 'UserController::signup');   // Protected route
    $routes->post('(:num)', 'UserController::update/$1');  // Protected route
    $routes->delete('(:num)', 'UserController::delete/$1');  // Protected route
});
