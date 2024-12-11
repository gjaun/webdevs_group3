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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken"); // load token stored in localStorage
      if (!token) {
        alert("Not authenticated. Redirecting to login.");
        navigate("/login");
        return;
      }

      setLoading(true); // loading state true
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
        setLoading(false); // stop loading
      }
    };

    fetchData();
  }, [formData, navigate]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("authToken"); // load token stored in localStorage
    if (!token) {
      alert("Not authenticated. Redirecting to login.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        "https://webdevs-group3-backend.onrender.com/questions/" + id,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // token from localStorage
          },
        }
      );

      if (response.ok) {
        alert("Question Deleted");
        setSurveys((prevQuestions) =>
          prevQuestions.filter((question) => question._id !== id)
        );
      } else {
        throw new Error("Delete failed");
      }
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
          <h1>Questions</h1>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button
              variant="outline-dark"
              size="lg"
              className="mb-3"
              onClick={() => navigate("/mysurveys")}
            >
              Back to Survey
            </Button>
            <Button
              variant="outline-dark"
              size="lg"
              className="mb-3"
              style={{ marginRight: "25px" }}
              onClick={() => navigate("/add/" + params.id + "/" + params.name)}
            >
              Add Question
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
                  <div className="surveyDesc">
                    <p>Question: {item?.question}</p>
                    <p>Survey Name: {params.name}</p>
                  </div>
                  <Button
                    variant="outline-dark"
                    size="sm"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outline-dark"
                    size="sm"
                    onClick={() =>
                      navigate(
                        "/update/" +
                          params.id +
                          "/" +
                          params.name +
                          "/" +
                          item._id +
                          "/" +
                          item.question
                      )
                    }
                  >
                    Edit
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No questions available...</p> // message when no questions exist
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default EditSurvey;
