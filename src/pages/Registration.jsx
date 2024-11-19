import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Registration() {
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
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
      const response = await fetch('http://localhost:8080/auth/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      if (response.status === 201) {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 2000); // Redirect to login
      } else {
        const resData = await response.json();
        setError(resData.message || 'Registration failed. Check input.');
      }
    } catch (err) {
      setError('Error connecting to the server. Please try again.');
    }
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>
      {success && (
        <Alert variant="success">
          Registration successful! Redirecting to login...
        </Alert>
      )}
      {error && <Alert variant="danger">{error}</Alert>}
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
        <Button variant="outline-dark" size="sm" type="submit" className="mt-5">
          Register
        </Button>
        <Button
          variant="outline-dark"
          size="sm"
          className="mt-5"
          onClick={() => navigate('/login')}
        >
          Back to Login
        </Button>
      </Form>
    </div>
  );
}

export default Registration;
