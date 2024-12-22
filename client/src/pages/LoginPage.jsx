import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

export const LoginPage = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const BASE_URL = 'http://localhost:8081';

    const api = axios.create({
        baseURL: 'http://localhost:8081',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    useEffect(() => {
        const token = Cookies.get('ToDoToken');
        if (token) {
            api.get('/api/todo', {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            })
            .then(() => navigate('/todo'))
            .catch((error) => {
                console.error('Token validation error:', error);
                Cookies.remove('ToDoToken');
            });
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        
        try {
            console.log('Attempting login...');
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:8081/api/login',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: formData
            });

            console.log('Login response:', response.data);

            if (response.data.token) {
                Cookies.set('ToDoToken', response.data.token, {
                    path: '/',
                    sameSite: 'lax'
                });
                navigate('/todo');
            }
        } catch (error) {
            console.error('Login error:', error);
            if (error.response) {
                // Server responded with an error
                setError(error.response.data.message);
            } else if (error.request) {
                // Request was made but no response
                setError('No response from server. Please try again.');
            } else {
                // Something else went wrong
                setError('An error occurred. Please try again.');
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};