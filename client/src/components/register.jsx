// components/Register.jsx
import React, { useState } from 'react';

function Register() {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to handle registration
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" value={userData.username} onChange={handleChange} placeholder="Username" />
            <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Email" />
            <input type="password" name="password" value={userData.password} onChange={handleChange} placeholder="Password" />
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;
