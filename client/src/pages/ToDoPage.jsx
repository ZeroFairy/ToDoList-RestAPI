import React, { useState, useEffect } from 'react';
import { gettodo, addtodo, updatetodo, deletetodo } from '../services/api';
import { NewTodoForm } from '../components/NewTodoForm';
import { ToDoList } from '../components/ToDoList';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export function ToDoPage() {
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate();

    // Fetch todos on component mount
    useEffect(() => {
        const token = Cookies.get('ToDoToken');
        if (!token) {
            navigate('/login');
            return;
        }

        if (id) {
            fetchTodos(id, token);
        }
    }, [id, navigate]);

    const fetchTodos = async (id, token) => {
        try {
            console.log(id);
            const response = await gettodo(id, token);
            if (response.data_tasks) {
                setTodos(response.data_tasks.map(task => ({
                    id: task.id,
                    title: task.task,
                    status: task.status === 'finished'
                })));
            }
            console.log(response.data_tasks);
        } catch (err) {
            setError('Failed to fetch todos');
            console.error('Error fetching todos:', err);
        }
    };

    async function handleAddTodo(title) {
        try {
            const response = await addtodo({ task: title });
            if (response.data) {
                setTodos(currentTodos => [
                    ...currentTodos,
                    {
                        id: response.data.id,
                        title: title,
                        completed: false
                    }
                ]);
            }
        } catch (err) {
            setError('Failed to add todo');
            console.error('Error adding todo:', err);
        }
    }

    async function handleToggleTodo(id, completed) {
        try {
            await updatetodo(id, { status: completed ? 'finished' : 'unfinished' });
            setTodos(currentTodos => {
                return currentTodos.map(todo => {
                    if (todo.id === id) {
                        return { ...todo, completed }
                    }
                    return todo
                })
            });
        } catch (err) {
            setError('Failed to update todo');
            console.error('Error updating todo:', err);
        }
    }

    async function handleDeleteTodo(id) {
        try {
            await deletetodo(id);
            setTodos(currentTodos => {
                return currentTodos.filter(todo => todo.id !== id)
            });
        } catch (err) {
            setError('Failed to delete todo');
            console.error('Error deleting todo:', err);
        }
    }

    return (
        <div className="container mx-auto p-4">
            {error && <div className="error-message text-red-500 mb-4">{error}</div>}
            <NewTodoForm onSubmit={handleAddTodo} />
            <h1 className="text-2xl font-bold my-4">Todo List</h1>
            <ToDoList 
                todos={todos} 
                toggleTodo={handleToggleTodo} 
                deleteTodo={handleDeleteTodo} 
            />
        </div>
    );
}