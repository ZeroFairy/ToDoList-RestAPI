<?php

namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;

class CorsMiddleware implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        log_message('info', 'CORS Middleware executed'); // Log message to check if the middleware is called
        
        // Set the CORS headers
        header("Access-Control-Allow-Origin: http://localhost:5173"); // Your frontend URL
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");

        // Handle preflight requests
        if ($request->getMethod() === 'OPTIONS') {
            // The OPTIONS request is a preflight request; end it here
            exit();
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // This can remain empty as we don’t need to perform any actions after the response
    }
}
