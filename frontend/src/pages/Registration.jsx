import React, { useState } from "react";
import {
  Button,
  Form,
  Alert,
  Container,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Registration() {
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setLoading(true); // loading state true

    try {
      const response = await fetch(
        "https://webdevs-group3-backend.onrender.com/auth/registration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
          credentials: "include",
        }
      );

      if (response.status === 201) {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 2000); // Redirect to login
      } else {
        const resData = await response.json();
        setError(resData.message || "Registration failed. Check input.");
      }
    } catch (err) {
      setError("Error connecting to the server. Please try again.");
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <Container>
      <Row className="registration">
        <Col>
          <div className="registration-container">
            <h1>Registration</h1>
            {success && (
              <Alert variant="success">
                Registration successful! Redirecting to login...
              </Alert>
            )}
            {error && <Alert variant="danger">{error}</Alert>}
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Spinner animation="border" role="statue">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : (
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="validationCustom01">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your username"
                    size="lg"
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
                    size="lg"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a password.
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="button_group">
                  <Button
                    variant="outline-dark"
                    size="lg"
                    type="submit"
                    className="mt-5"
                  >
                    Register
                  </Button>
                  <Button
                    variant="outline-dark"
                    size="lg"
                    className="mt-5"
                    onClick={() => navigate("/login")}
                  >
                    Back to Login
                  </Button>
                </div>
              </Form>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Registration;
