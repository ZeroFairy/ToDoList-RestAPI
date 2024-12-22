<?php

namespace App\Controllers;

use CodeIgniter\Controller;
use CodeIgniter\HTTP\CLIRequest;
use CodeIgniter\HTTP\IncomingRequest;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use CodeIgniter\RESTful\ResourceController;

/**
 * Class BaseController
 *
 * BaseController provides a convenient place for loading components
 * and performing functions that are needed by all your controllers.
 * Extend this class in any new controllers:
 *     class Home extends BaseController
 *
 * For security be sure to declare any new methods as protected or private.
 */
abstract class BaseController extends Controller
{
    /**
     * Instance of the main Request object.
     *
     * @var CLIRequest|IncomingRequest
     */
    protected $request;

    /**
     * An array of helpers to be loaded automatically upon
     * class instantiation. These helpers will be available
     * to all other controllers that extend BaseController.
     *
     * @var list<string>
     */
    protected $helpers = [];

    /**
     * Be sure to declare properties for any property fetch you initialized.
     * The creation of dynamic property is deprecated in PHP 8.2.
     */
    // protected $session;

    /**
     * @return void
     */
    public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger)
    {
        // Do Not Edit This Line
        parent::initController($request, $response, $logger);

        // Preload any models, libraries, etc, here.

        // E.g.: $this->session = \Config\Services::session();
    }
}

// namespace App\Controllers;

// use CodeIgniter\RESTful\ResourceController;
// use CodeIgniter\HTTP\ResponseInterface;

// class BaseController extends ResourceController
// {
//     protected $response;
//     protected $format = 'json';

//     public function __construct()
//     {
//         // Set default headers for all responses
//         $this->response = service('response');
//         $this->response->setHeader('Content-Type', 'application/json');
//         $this->response->setHeader('X-Content-Type-Options', 'nosniff');
//     }

//     /**
//      * Send a success response
//      */
//     protected function sendSuccess($data = null, string $message = 'Success', int $code = 200)
//     {
//         return $this->response->setStatusCode($code)
//             ->setJSON([
//                 'status' => 'success',
//                 'message' => $message,
//                 'data' => $data
//             ]);
//     }

//     /**
//      * Send an error response
//      */
//     protected function sendError($message = 'Error', $errors = null, int $code = 400)
//     {
//         return $this->response->setStatusCode($code)
//             ->setJSON([
//                 'status' => 'error',
//                 'message' => $message,
//                 'errors' => $errors
//             ]);
//     }

//     /**
//      * Handle validation errors
//      */
//     protected function handleValidationErrors($validator)
//     {
//         return $this->sendError(
//             'Validation failed',
//             $validator->getErrors(),
//             422
//         );
//     }

//     /**
//      * Handle database errors
//      */
//     protected function handleDatabaseError(\Exception $e)
//     {
//         log_message('error', 'Database Error: ' . $e->getMessage());
//         return $this->sendError(
//             'Database error occurred',
//             null,
//             500
//         );
//     }
// }
