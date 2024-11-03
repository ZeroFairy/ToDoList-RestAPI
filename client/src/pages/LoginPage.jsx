import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { login, todo } from '../services/api'; // Import the API functions

export const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Check token validity on page load
    // useEffect(() => {
    //     const token = Cookies.get('ToDoToken');
    //     if (token) {
    //         // Verify token with API using the todo endpoint
    //         todo(token)
    //             .then(() => navigate('/server/todo')) // Redirect if token is valid
    //             .catch(() => Cookies.remove('ToDoToken')); // Remove invalid token
    //     }
    // }, [navigate]);

    useEffect(() => {
        const token = Cookies.get('ToDoToken');
        if (token) {
            navigate('/todo');
        }
    }, [navigate]);

    // Update form input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Submit form data to the server
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setError(null);
    //     try {
    //         console.log('Submit');
    //         const response = await login(formData); // Use login from api.js
    //         // const response = await axios.post('http://localhost:8081/server/login', formData['email', 'password']); // Use login from api.js
    //         console.log('Response');
    //         Cookies.set('ToDoToken', response.data.token, { secure: true, sameSite: 'Strict' });

    //         console.log(Cookies.get('ToDoToken'));

    //         navigate('/todo'); // Redirect on successful login
    //     } catch (error) {
    //         setError(error.response?.data?.message || 'Login failed. Please try again.');
    //     }
    //     setFormData("");
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            console.log('Submit');
            const response = await login(formData);
            console.log('Response');
            const { token } = response.data;
            
            // Store token in cookie with secure settings
            Cookies.set('ToDoToken', token, {
                secure: true,
                sameSite: 'strict',
                expires: 1 // 1 day
            });

            navigate('/todo');
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed. Please try again.');
        }
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
