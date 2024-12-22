<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

$routes->get('/', 'Home::index');

// Group all API routes under a common namespace (e.g., /api)
$routes->group('api', function ($routes) {

    // Authentication and User routes (CORS applied globally)
    $routes->post('login', 'UserController::login');  // Login route
    $routes->post('signup', 'UserController::signup'); // Signup route

    // Routes requiring authentication
    $routes->group('user', ['filter' => 'auth'], function ($routes) {
        $routes->get('/', 'UserController::index'); // Get user details
        $routes->post('(:num)', 'UserController::update/$1'); // Update user details
        $routes->delete('(:num)', 'UserController::delete/$1'); // Delete user
    });

    // To-Do routes requiring authentication
    $routes->group('todo', ['filter' => 'auth'], function ($routes) {
        $routes->get('/', 'TodoController::index'); // Get all tasks
        $routes->post('/', 'TodoController::create'); // Create a task
        $routes->post('update/(:num)', 'TodoController::update/$1'); // Update a task
        $routes->post('(:num)', 'TodoController::edit/$1'); // Edit a task
        $routes->delete('(:num)', 'TodoController::delete/$1'); // Delete a task
    });
});