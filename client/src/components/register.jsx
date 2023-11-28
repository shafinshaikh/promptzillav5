import React, { useState } from 'react';

function Register() {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            if (response.status === 201) {
                setMessage('Registration successful');
                // Redirect or further actions after successful registration
            } else {
                setMessage(data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setMessage('Registration failed');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">Register</h2>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                    <input type="text" name="username" id="username" value={userData.username} onChange={handleChange} placeholder="Username" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input type="email" name="email" id="email" value={userData.email} onChange={handleChange} placeholder="Email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input type="password" name="password" id="password" value={userData.password} onChange={handleChange} placeholder="Password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <button type="submit" className="w-full bg-[#8976fd] hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</button>
                {message && <p className="mt-3 text-red-500">{message}</p>}
            </form>
        </div>
    );
}

export default Register;
