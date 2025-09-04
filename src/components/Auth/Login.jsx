// src/components/Auth/Login.jsx
import React, { useState } from 'react';
import './Auth.css';

const Login = ({ onSuccess, onSwitchToRegister, onSwitchToPhone }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo ke liye hardcoded - baad mein Firebase se connect karenge
    if (credentials.email && credentials.password) {
      onSuccess({
        id: 1,
        name: 'Demo User',
        email: credentials.email,
        phoneNumber: '+919876543210'
      });
    }
  };

  return (
    <div className="auth-form">
      <h2>Login with Email</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={credentials.email}
            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            required
          />
        </div>

        <button type="submit" className="auth-button">
          Login
        </button>
      </form>

      <p className="auth-switch">
        Don't have an account?{' '}
        <span onClick={onSwitchToRegister}>Register here</span>
      </p>

      <p className="auth-switch">
        <span onClick={onSwitchToPhone}>Login with Phone instead</span>
      </p>
    </div>
  );
};

export default Login;