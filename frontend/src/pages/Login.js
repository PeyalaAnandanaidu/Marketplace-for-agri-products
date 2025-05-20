import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { FaGoogle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext'; 
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('https://marketplace-for-agri-products-backend.onrender.com/api/auth/login', {
        email,
        password
      });

      const token = res.data.token;
      login(token); // ✅ save token using context
      setSuccess(true);
      navigate('/farmer');
    } catch (err) {
      console.error('Login error:', err.response ? err.response.data : err.message);
      const message = err.response?.data?.message || 'Invalid credentials';
      setError(message);
      setSuccess(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'https://marketplace-for-agri-products-backend.onrender.com/api/auth/google';
  };

  return (
    <div className="auth-page">
      <Container className="auth-container">
        <Card className="auth-card">
          <h2 className="auth-title">Login</h2>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">Login successful!</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="auth-button w-100 mb-3">
              Login
            </Button>

           
          </Form>

          <p className="auth-link">
            Don't have an account? <a href="/register">Register here</a>
          </p>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
