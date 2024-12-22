import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/api';

export function SignupPage() {
    const [formData, setFormData] = useState({ nama: '', email: '', password: '', verify_password: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            console.log('Attemptting signup...');
            const response = await signup(formData);
            console.log('Signup success:', response.data);

            navigate('/login');
        } catch (error) {
            console.error('Signup failed:', error);
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="nama" 
                    placeholder="Nama" 
                    value={formData.name}
                    onChange={handleChange} 
                    required
                />
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
                <input
                    type="password"
                    name="verify_password"
                    placeholder="Verify Password"
                    value={formData.verify_password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

