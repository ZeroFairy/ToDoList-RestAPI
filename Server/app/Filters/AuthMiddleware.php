<?php

namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;
use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;
use Config\Services;

use \Firebase\JWT\Key;

class AuthMiddleware implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        // header("Access-Control-Allow-Origin: *");
        // header("Access-Control-Allow-Headers: X-API-KEY, Origin,X-Requested-With, Content-Type, Accept, Access-Control-Requested-Method, Authorization, strict-origin-when-cross-origin");
        // header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PATCH, PUT, DELETE");
        // $method = $_SERVER['REQUEST_METHOD'];
        // if($method == "OPTIONS"){
        //     die();
        // }

        // Get the Authorization header from the request
        $header = $request->getHeaderLine('Authorization');
        $token = $header ? str_replace('Bearer ', '', $header) : null;

        if (!$token) {
            return Services::response()->setStatusCode(401)->setJSON(['message' => 'Token required']);
        }

        try {
            // $decodedToken = JWT::decode($token, config('App')->JWT_SECRET_KEY, ['HS256']);
            $decodedToken = JWT::decode($token, new Key(config('App')->JWT_SECRET_KEY, 'HS256'));
            // Store user data from the token if needed
            $request->user = $decodedToken;
        } catch (ExpiredException $e) {
            return Services::response()->setStatusCode(401)->setJSON(['message' => 'Token expired']);
        } catch (\Exception $e) {
            return Services::response()->setStatusCode(401)->setJSON(['message' => 'Invalid token']);
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // This can remain empty as we don’t need to perform any actions after the response
    }
}
