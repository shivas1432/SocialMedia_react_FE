import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/login.css'; // Optional: for styling
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '', 
    password: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required'; 
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:8081/api/login', formData);
        
        // Extract user information from the response
        const { message, user } = response.data; // Update based on your API response structure

        // Store email and token in localStorage if exists
        if (user) {
            localStorage.setItem('email', user.email);
            // Make sure to handle the token if your API provides it
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
        }

        console.log('Login successful:', message);
       // Example of navigating to Feed1
navigate('/feed1', { state: { userEmail: user.email } });

      } catch (error) {
        console.error('Login failed:', error.response ? error.response.data : error.message);
        const message = error.response?.data?.error || 'Login failed. Please try again.';
        setErrors({ form: message });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="social-media-login-container">
      <h2>Login To Your Account</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email" 
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required // Ensures the field is required
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required //
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>
        {errors.form && <p className="error-text">{errors.form}</p>}
        <button type="submit">Login</button>
      </form>

      <div className="account-actions">
        <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
      </div>

      <div className="create-account">
        <p>Don't have an account?</p>
        <Link to="/register" className="create-account-link">Create Account</Link>
      </div>
    </div>
  );
};

export default Login;
