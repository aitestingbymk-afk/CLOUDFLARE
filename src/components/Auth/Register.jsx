// src/components/Auth/Register.jsx
import React, { useState } from 'react';
import './Auth.css';

const Register = ({ onSuccess, onSwitchToLogin }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    // Demo ke liye - baad mein Firebase integration
    onSuccess({
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      phoneNumber: '+919876543210'
    });
  };

  return (
    <div className="auth-form">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={userData.name}
            onChange={(e) => setUserData({...userData, name: e.target.value})}
            required
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={userData.email}
            onChange={(e) => setUserData({...userData, email: e.target.value})}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
            value={userData.password}
            onChange={(e) => setUserData({...userData, password: e.target.value})}
            required
          />
        </div>

        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={userData.confirmPassword}
            onChange={(e) => setUserData({...userData, confirmPassword: e.target.value})}
            required
          />
        </div>

        <button type="submit" className="auth-button">
          Register
        </button>
      </form>

      <p className="auth-switch">
        Already have an account?{' '}
        <span onClick={onSwitchToLogin}>Login here</span>
      </p>
    </div>
  );
};

export default Register;