import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CreateSurveys(props) {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    // creator: '',
    // password: '',
    // user_pass: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const token = localStorage.getItem("authToken"); // load token stored in localStorage
      if (!token) {
        alert("Not authenticated. Redirecting to login.");
        navigate("/login");
        return;
      }

      const response = await fetch(
        "https://webdevs-group3-backend.onrender.com/surveys/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // token from localStorage
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        alert("Survey created");
        setFormData({
          name: "",
          type: "",
          // creator: '',
          // password: '',
          // user_pass: '',
        });
        setValidated(false);
        navigate("/mysurveys"); // navigate to mysurveys page
      } else if (response.status === 401) {
        alert("Authentication required. Redirecting to login.");
        navigate("/login");
      } else {
        alert("Failed to submit survey...");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <Container>
      <Row className="create_survey">
        <Col>
          <div className="create-container">
            <h1>Survey Information</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group controlId="validationCustom01">
                <Form.Label>Survey Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Survey name"
                  size="lg"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationCustom02">
                <Form.Label>Type</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Survey Type"
                  size="lg"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <div style={{ display: "flex", justifyContent: "end" }}>
                <Button
                  variant="outline-dark"
                  size="lg"
                  type="submit"
                  className="mt-5"
                >
                  Submit form
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateSurveys;
