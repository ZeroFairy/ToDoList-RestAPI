<?php

namespace App\Controllers;

use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\RESTful\ResourceController;
use Firebase\JWT\JWT;
use \Firebase\JWT\Key;

class TodoController extends ResourceController
{
    protected $modelName = 'App\Models\ToDo';
    protected $format = 'json';

    /**
     * Return an array of resource objects, themselves in array format.
     *
     * @return ResponseInterface
     */
    public function index()
    {
        $id_user = $this->request->user->id;

        $data = [
            'message' => 'success',
            'data_tasks' => $this
                            ->model
                            ->select('id, task, status, id_user')
                            ->where('id_user', $id_user)
                            ->orderBy('id', 'ASC')
                            ->findAll()
        ];

        return $this->respond($data, 200);
    }

    /**
     * Return the properties of a resource object.
     *
     * @param int|string|null $id
     *
     * @return ResponseInterface
     */
    public function show($id = null)
    {
        
    }

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
     * @return ResponseInterface
     */
    public function create()
    {
        $rules = $this->validate([
            'task' => 'required', 
        ]);
        
        if (!$rules) {
            $reponse = [
                'message' => $this->validator->getErrors()
            ];
            
            return $this->failValidator($reponse);
        }

        $id_user = $this->request->user->id;

        $this->model->insert([
            'task' => esc($this->request->getVar('task')),
            'id_user' => $id_user
        ]);

        $response = [
            'message' => 'Data Task Berhasil Dibuat'
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
        $task = $this->model->find($id);
        $newStatus = ($task['status'] === 'unfinished') ? 'finished' : 'unfinished';

        // Update the status in the database
        $this->model->update($id, ['status' => $newStatus]);

        // Prepare the response data
        $response = [
            'message' => 'Status Task Berhasil Diubah',
            'data' => [
                'id' => $id,
                'status' => $newStatus
            ]
        ];

        return $this->respond($response, 200);
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
            'task' => 'required', 
        ]);
        
        if (!$rules) {
            $reponse = [
                'message' => $this->validator->getErrors()
            ];
            
            return $this->fail($reponse);
        }

        $task = esc($this->request->getVar('task'));

        $this->model->update($id, ['task' => $task]);
    
        // Prepare the response data
        $response = [
            'message' => 'Isi Task berhasil diubah',
            'data' => [
                'id' => $id,
                'task' => $task
            ]
        ];

        return $this->respond($response, 200);
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
            'message' => 'Task Berhasil Dihapus'
        ];

        return $this->respondDeleted($response);
    }
}
