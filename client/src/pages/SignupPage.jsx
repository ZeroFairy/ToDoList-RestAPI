import React, { useState } from 'react';
import { signup } from '../services/api';

export function SignupPage() {
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await signup(formData);
        console.log('Signup success:', response.data);
        } catch (error) {
        console.error('Signup failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <input type="text" name="username" onChange={handleChange} placeholder="Username" />
        <input type="password" name="password" onChange={handleChange} placeholder="Password" />
        <button type="submit">Sign Up</button>
        </form>
    );
};

