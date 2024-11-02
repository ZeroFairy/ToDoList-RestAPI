import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { login, todo } from '../services/api'; // Import the API functions

export const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Check token validity on page load
    useEffect(() => {
        const token = Cookies.get('ToDoToken');
        if (token) {
            // Verify token with API using the todo endpoint
            todo({ headers: { Authorization: `Bearer ${token}` } })
                .then(() => navigate('/server/todo')) // Redirect if token is valid
                .catch(() => Cookies.remove('ToDoToken')); // Remove invalid token
        }
    }, [navigate]);

    // Update form input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Submit form data to the server
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await login(formData); // Use login from api.js
            Cookies.set('ToDoToken', response.data.token, { secure: true, sameSite: 'Strict' });
            navigate('/server/todo'); // Redirect on successful login
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
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
