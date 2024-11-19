import React, { useState } from 'react';
import { Button, Form, Alert, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Login(props) {
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showRegisterPrompt, setShowRegisterPrompt] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      if (response.status === 200) {
        navigate('/mysurveys');
      } else {
        const resData = await response.json();
        if (response.status === 404) {
          setError(resData.message || 'User not found');
          setShowRegisterPrompt(true);
        } else {
          setError(resData.message || 'Invalid username or password');
          setShowRegisterPrompt(false);
        }
      }
    } catch (err) {
      setError('Error connecting to the server. Please try again.');
      setShowRegisterPrompt(false);
    }
  };

  return (
    <Container>
      {error && <Alert variant="danger">{error}</Alert>}
      {showRegisterPrompt && (
        <Alert variant="info">
          User not found. Would you like to{' '}
          <a
            onClick={() => navigate('/registration')}
            style={{ cursor: 'pointer' }}
          >
            register
          </a>{' '}
          instead?
        </Alert>
      )}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="validationCustom01">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter your username"
            size="sm"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="validationCustom02">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter your password"
            size="sm"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a password.
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="outline-dark" size="sm" type="submit" className="mt-3">
          Log In
        </Button>
        <Button
          variant="outline-dark"
          size="sm"
          className="mt-3"
          onClick={() => navigate('/registration')}
        >
          Register
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
