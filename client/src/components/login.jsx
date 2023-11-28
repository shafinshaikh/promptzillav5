import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.status === 200) {
                navigate('/dashboard');
            } else {
                console.error('Login failed:', data.message);
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">Login</h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <button type="submit" className="w-full bg-[#8976fd] hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
            </form>
        </div>
    );
}

export default Login;
