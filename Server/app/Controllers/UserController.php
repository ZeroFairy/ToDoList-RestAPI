<?php

namespace App\Controllers;

use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\RESTful\ResourceController;
use \Firebase\JWT\JWT;
use Config\Services;


class UserController extends ResourceController
{
    protected $modelName = 'App\Models\User';
    protected $format = 'json';
    
    /**
     * Return an array of resource objects, themselves in array format.
     *
     * @return ResponseInterface
     */
    public function index()
    {
        $data = [
            'message' => 'success',
            'data_user' => $this->model->orderBy('id', 'ASC')->findAll()
        ];

        return $this->respond(setJSON($data), 200);
    }

    // /**
    //  * Return the properties of a resource object.
    //  *
    //  * @param int|string|null $id
    //  *
    //  * @return ResponseInterface
    //  */
    // public function show($id = null)
    // {
    //     $rules = $this->validate([
    //         'password' => 'required|min_length[8]'
    //     ]);

    //     $enterPassword = $this->request->getVar('password');
    //     echo "Entered Password: " . $enterPassword;

    //     $user = $this->model->select('nama, email, password')->find($id);
    //     echo "Stored Password Hash: " . $user['password'];

    //     if ($user == null) {
    //         return $this->FailNotFound('Data user not found');
    //     }
        
    //     if (password_verify($enterPassword, $user['password'])) {
    //         $data = [
    //             'message' => 'success',
    //             'user_name'  => $user['nama'],
    //             'user_email'  => $user['email']
    //         ];

    //         return $this->respond($data,200);
    //     } else {
    //         $data = [
    //             'message' => 'password wrong'
    //         ];
    //         return $this ->respond($data,401);
    //     }
    // }
    
    /**
     * Return the properties of a resource object.
     *
     * @param int|string|null $id
     *
     * @return ResponseInterface
     */
    public function login()
    {
        // Set proper content type header
        $this->response->setHeader('Content-Type', 'application/json');

        $rules = $this->validate([
            'email' => 'required',
            'password' => 'required|min_length[8]'
        ]);

        if (!$rules) {
            return $this->response
                ->setStatusCode(400)
                ->setJSON([
                    'status' => 'error',
                    'message' => 'Validation failed',
                    'errors' => $this->validator->getErrors()
                ]);
        }

        $enterEmail = $this->request->getVar('email');
        $enterPassword = $this->request->getVar('password');

        $user = $this->model->select('id, nama, email, password')
            ->where('email', $enterEmail)
            ->first();

        if (!$user) {
            return $this->response
                ->setStatusCode(404)
                ->setJSON([
                    'status' => 'error',
                    'message' => 'User not found'
                ]);
        }

        if (password_verify($enterPassword, $user['password'])) {
            $tokenPayload = [
                'id' => $user['id'],
                'email' => $user['email'],
                'exp' => time() + (60 * 60)
            ];

            $token = JWT::encode(
                $tokenPayload,
                config('App')->JWT_SECRET_KEY,
                'HS256'
            );

            return $this->response
                ->setStatusCode(200)
                ->setJSON([
                    'status' => 'success',
                    'token' => $token,
                    'user' => [
                        'id' => $user['id'],
                        'email' => $user['email'],
                        'nama' => $user['nama']
                    ]
                ]);
        }

        return $this->response
            ->setStatusCode(401)
            ->setJSON([
                'status' => 'error',
                'message' => 'Invalid password'
            ]);
    }
    // public function login()
    // {
    //     // header("Access-Control-Allow-Origin: http://localhost:5173");
    //     // header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    //     // header("Access-Control-Allow-Headers: Content-Type, Authorization");

    //     // if ($this->request->getMethod() === 'options') {
    //     //     return $this->response->setStatusCode(200); // Handle preflight request
    //     // }

    //     $rules = $this->validate([
    //         'email' => 'required',
    //         'password' => 'required|min_length[8]'
    //     ]);
        
    //     $enterEmail = $this->request->getVar('email');
    //     // echo "Enter email: " . $enterEmail;

    //     $user = $this->model->select('id, nama, email, password')->where('email', $enterEmail)->get()->getRowArray();
    //     // echo "User by Email: " . $user['email'];
    //     // echo "Stored Password Hash: " . $user['password'];

    //     $enterPassword = $this->request->getVar('password');
    //     // echo "Entered Password: " . $enterPassword;

    //     if ($user == null) {
    //         return $this->FailNotFound('Data user not found');
    //     }
        
    //     if (password_verify($enterPassword, $user['password'])) {
    //         $tokenPayload = [
    //             'id' => $user['id'],
    //             'email' => $user['email'],
    //             'exp' => time() + (60 * 60) // Token expiration (1 hour)
    //         ];

    //         $secretKey = config('App')->JWT_SECRET_KEY;
    //         $token = JWT::encode($tokenPayload, $secretKey, 'HS256');

    //         // Return token to the client
    //         return $this->respond(['token' => $token], 200);
            
    //     } else {
    //         $data = [
    //             'message' => 'password wrong'
    //         ];
    //         return $this ->respond(setJSON($data), 401);
    //     }
    // }

    /**
     * Return a new resource object, with default properties.
     *
     * @return ResponseInterface
     */
    public function new()
    {
        //
    }

    /**
     * Create a new resource object, from "posted" parameters.
     *
     * Data yang diinput adalah nama, email, password
     * 
     * Password yang diinput akan dilakukan encrypttion, setelah itu baru simpan dalam database
     * @return ResponseInterface
     */
    public function signUp()
    {
        $rules = $this->validate([
            'nama' => 'required',
            'email' => 'required',
            'password' => 'required|min_length[8]',
            'verify_password' => 'required|matches[password]|min_length[8]'
        ]);

        if (!$rules) {
            $response = [
                'message' => $this->validator->getErrors()
            ];

            return $this->failValidationErrors($response);
        }

        $password = $this->request->getVar('password');
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $this->model->insert([
            'nama' => esc($this->request->getVar('nama')),
            'email' => esc($this->request->getVar('email')),
            'password' => $hashedPassword
        ]);

        // echo "Hashed Password: " . $hashedPassword;

        $response = [
            'message' => 'Data User Berhasil Dibuat'
        ];

        return $this->respondCreated($response);
    }

    /**
     * Return the editable properties of a resource object.
     *
     * @param int|string|null $id
     *
     * @return ResponseInterface
     */
    public function edit($id = null)
    {
        //
    }

    /**
     * Add or update a model resource, from "posted" properties.
     *
     * @param int|string|null $id
     *
     * @return ResponseInterface
     */
    public function update($id = null)
    {
        $rules = $this->validate([
            'nama' => 'required',
            'old_password' => 'required|min_length[8]',
            'new_password' => 'required|min_length[8]',
            'new_password_two' => 'required|matches[new_password]|min_length[8]'
        ]);

        if (!$rules) {
            log_message('error', 'Validation failed: ' . json_encode($this->validator->getErrors()));
            $response = [
                'message' => $this->validator->getErrors()
            ];
            return $this->failValidationErrors($response);
        }

        $user = $this->model->select('nama, email, password')->find($id);

        $enterPassword = $this->request->getVar('old_password');

        $password = $this->request->getVar('new_password');
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        if (password_verify($enterPassword, $user['password'])) {
                $this->model->update($id, [
                    'nama' => esc($this->request->getVar('nama')),
                    'password' => $hashedPassword
                ]);

                $response = [
                    'message' => 'Data User Berhasil Diubah'
                ];

                return $this->respond($response, 200);
        } else {
            $data = [
                'message' => 'password wrong'
            ];
            return $this ->respond($data,401);
        }
    }

    /**
     * Delete the designated resource object from the model.
     *
     * @param int|string|null $id
     *
     * @return ResponseInterface
     */
    public function delete($id = null)
    {
        $this->model->delete($id);

        $response = [
            'message' => 'Data User Berhasil Dihapus'
        ];

        return $this->respondDeleted($response);
    }
}
