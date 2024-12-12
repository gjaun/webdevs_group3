import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function CreateSurveys(props) {
  const [validated, setValidated] = useState(false);
  const params = useParams();
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
    const data = {
      question: formData.name,
      surveyid: params.id,
    };
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
        "https://webdevs-group3-backend.onrender.com/questions/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // token from localStorage
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        alert("Question Created");
        setFormData({
          name: "",
          type: "",
          // creator: '',
          // password: '',
          // user_pass: '',
        });
        setValidated(false);
        navigate("/edit/" + params.id + "/" + params.name); // navigate to edit page
      } else if (response.status === 401) {
        alert("Authentication required. Redirecting to login.");
        navigate("/login");
      } else {
        alert("Failed to submit question...");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <Container>
      <Row className="add_questions">
        <Col>
          <h1>Add Question</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="validationCustom01">
              <Form.Label>Question</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Question"
                size="lg"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <div className="button_group">
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
        </Col>
      </Row>
    </Container>
  );
}

export default CreateSurveys;
