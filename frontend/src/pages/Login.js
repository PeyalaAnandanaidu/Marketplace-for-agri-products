import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { FaGoogle } from 'react-icons/fa'; // Import Google icon
import './Auth.css'; // Import the shared CSS file


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending login request...');
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      console.log('Login response:', res.data);
      localStorage.setItem('token', res.data.token);
      setSuccess(true);
      navigate('/farmer'); 
    } catch (err) {
      console.error('Login error:', err.response ? err.response.data : err.message);
      setError('Invalid credentials');
      setSuccess(false);
    }
  };

  const handleGoogleLogin = () => {
    // Redirect to backend Google OAuth endpoint
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <div className="auth-page">
      <Container className="auth-container">
        <Card className="auth-card">
          <h2 className="auth-title">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && (
            <Alert variant="success">
              Login successful!
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="auth-button w-100 mb-3">
              Login
            </Button>

            {/* Google OAuth Button */}
            <Button 
              variant="outline-danger" 
              className="w-100 mb-3 d-flex align-items-center justify-content-center"
              onClick={handleGoogleLogin}
            >
              <FaGoogle className="me-2" />
              Continue with Google
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