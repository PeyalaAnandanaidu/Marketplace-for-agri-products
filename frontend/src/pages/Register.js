import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import './Auth.css'; // Import the shared CSS file

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending registration request...');
      const res = await axios.post('https://marketplace-for-agri-products-backend.onrender.com/api/auth/register', { name, email, password, role });
      console.log('Registration response:', res.data);
      localStorage.setItem('token', res.data.token);
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err.response ? err.response.data : err.message);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-page"> {/* Wrap the Container with auth-page */}
      <Container className="auth-container">
        <Card className="auth-card">
          <h2 className="auth-title">Register</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

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

            

            <Button variant="primary" type="submit" className="auth-button">
              Register
            </Button>
          </Form>
          <p className="auth-link">
            Already have an account? <a href="/login">Login here</a>
          </p>
        </Card>
      </Container>
    </div>
  );
};

export default Register;
