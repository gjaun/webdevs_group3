import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function EditSurvey() {
  const [questions, setSurveys] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const [formData, setFormData] = useState({
    surveyid: params.id,
    // creator: '',
    // password: '',
    // user_pass: '',
  });
  const [loading, setLoaindg] = useState(true);
  const [input, setInput] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken"); // load token stored in localStorage
      if (!token) {
        alert("Not authenticated. Redirecting to login.");
        navigate("/login");
        return;
      }

      setLoaindg(true); // loading state true
      try {
        const response = await fetch(
          "https://webdevs-group3-backend.onrender.com/questions/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // token from localStorage
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.status === 401) {
          alert("Authentication required. Redirecting to login.");
          navigate("/login"); // redirect to login page if unauthorized
        } else if (!response.ok) {
          throw new Error("Failed to load questions");
        } else {
          const data = await response.json();
          setSurveys(data);
        }
      } catch (err) {
        setError(err.message || "An unknown error occurred");
      } finally {
        setLoaindg(false); // stop loading
      }
    };

    fetchData();
  }, [formData, navigate]);

  const handleInputChange = (e, questionId) => {
    const { value } = e.target;
    setInput((prevState) => ({ ...prevState, [questionId]: value }));
  };

  const handleSubmit = async () => {
    // check user input is empty or not
    const emptyInputs = questions.some((item) => {
      const userInput = input[item._id];
      return !userInput || !userInput.trim();
    });

    // if user input is empty
    if (emptyInputs) {
      alert("Please fill out questions before submitting!");
      return;
    }

    // if user input is not empty, submit and alert
    try {
      alert("Survey Submitted!");
      navigate("/mysurveys");
    } catch (err) {
      console.log("Error during Delete: ", err.message);
      alert("An error occurred while deleting");
    }
  };

  if (error) {
    return (
      <Container className="wrapper">
        <div>Error: {error}</div>
      </Container>
    );
  }

  return (
    <Container className="wrapper">
      <Row>
        <Col>
          <h1>Survey: {params.name}</h1>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button
              variant="outline-dark"
              size="lg"
              className="mb-3"
              style={{ marginRight: "25px" }}
              onClick={() => navigate("/mysurveys")}
            >
              Back to Surveys
            </Button>
          </div>

          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : questions.length > 0 ? (
            <ul>
              {questions.map((item) => (
                <li key={item._id} className="surveyList">
                  <div className="runDesc">
                    <p>Question: {item?.question}</p>
                    <input
                      name={`input-${item._id}`}
                      className="inputField"
                      value={input[item._id] || ""}
                      onChange={(e) => handleInputChange(e, item._id)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No questions available...</p> // message when no questions exist
          )}
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button
              variant="outline-dark"
              size="lg"
              className="mb=3"
              onClick={() => handleSubmit()}
            >
              Submit
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default EditSurvey;
