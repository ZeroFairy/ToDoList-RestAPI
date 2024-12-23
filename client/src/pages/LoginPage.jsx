import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import Cookies from 'js-cookie';
import axios from 'axios';

export const LoginPage = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const api = axios.create({
        baseURL: 'http://localhost:8081',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    useEffect(() => {
        const token = Cookies.get('ToDoToken');
        if (!token) {
            console.error('Token not found');
        } else {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(window.atob(base64));
        
            const currentTime = Math.floor(Date.now() / 1000);
            if (currentTime > payload.exp) {
                Cookies.remove('ToDoToken');
                navigate('/login');
            } else {
                const id = payload.id
                console.log(payload.id);
                navigate(`/todo/${id}`);
            }
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        
        try {
            console.log('Attempting login...');
            const response = await login(formData);
            console.log('Login response:', response.data);

            if (response.data.token) {
                Cookies.set('ToDoToken', response.data.token, {
                    path: '/',
                    sameSite: 'lax'
                });

                const id = response.data.user.id
                navigate(`/todo/${id}`);
            }
        } catch (error) {
            console.error('Login error:', error);
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