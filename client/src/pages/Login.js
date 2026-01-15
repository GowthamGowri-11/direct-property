// Login Page - User and Admin authentication
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userAPI, adminAPI } from '../services/api';
import './Auth.css';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '' // For admin login
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let response;
      
      if (isAdminLogin) {
        // Admin login
        response = await adminAPI.login({
          username: formData.username,
          password: formData.password
        });
        onLogin(response.data.data, true);
      } else {
        // User login
        response = await userAPI.login({
          email: formData.email,
          password: formData.password
        });
        onLogin(response.data.data, false);
      }

      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Welcome Back</h1>
            <p>Sign in to your account</p>
          </div>

          {/* Login Type Toggle */}
          <div className="login-toggle">
            <button 
              className={`toggle-btn ${!isAdminLogin ? 'active' : ''}`}
              onClick={() => setIsAdminLogin(false)}
            >
              User Login
            </button>
            <button 
              className={`toggle-btn ${isAdminLogin ? 'active' : ''}`}
              onClick={() => setIsAdminLogin(true)}
            >
              Admin Login
            </button>
          </div>

          {error && (
            <div className="message message-error">{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            {isAdminLogin ? (
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter admin username"
                  required
                />
              </div>
            ) : (
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-accent btn-full"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {!isAdminLogin && (
            <div className="auth-footer">
              <p>Don't have an account? <Link to="/register">Register</Link></p>
            </div>
          )}
        </div>

        {/* Demo Credentials */}
        <div className="demo-credentials">
          <p>Demo Admin: username: <strong>admin</strong>, password: <strong>admin123</strong></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
