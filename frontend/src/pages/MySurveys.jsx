import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function MySurveys() {
  const [surveys, setSurveys] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken"); // load token stored in localStorage
      if (!token) {
        setError("Not authenticated. Please log in.");
        navigate("/login");
        return;
      }

      setLoading(true); // loading state true
      try {
        const response = await fetch(
          "https://webdevs-group3-backend.onrender.com/surveys",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // token from localStorage
            },
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setSurveys(data);
        } else if (response.status === 401) {
          setError("Authentication required. Redirecting to login.");
          navigate("/login");
        } else {
          const resData = await response.json();
          setError(resData.message || "Failed to fetch surveys");
        }
      } catch (err) {
        setError(err.message || "An unknown error occurred");
      } finally {
        setLoading(false); // stop loading
      }
    };

    fetchData();
  }, [navigate]);

  const handleDeleteS = async (id) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Not authenticated. Please log in.");
      return;
    }

    setLoading(true); // loading state true
    try {
      const response = await fetch(
        "https://webdevs-group3-backend.onrender.com/surveys/" + id,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // token from localStorage
          },
        }
      );

      if (response.ok) {
        alert("Survey Deleted");
        await questionsDelete(id);
        setSurveys((prevState) => prevState.filter((item) => item._id !== id));
      } else {
        throw new Error("Delete failed");
      }
    } catch (err) {
      console.log("Error during Delete: ", err.message);
      alert("An error occurred while deleting");
    } finally {
      setLoading(false); // stop loading
    }
  };

  const questionsDelete = async (id) => {
    const token = localStorage.getItem("authToken");
    const data = { surveyid: id };

    try {
      const response = await fetch(
        "https://webdevs-group3-backend.onrender.com/questions",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // token from localStorage
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        alert("Questions Deleted");
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
          <h1>My Surveys</h1>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button
              variant="outline-dark"
              size="lg"
              className="mb=3"
              onClick={() => navigate("/create")}
            >
              Create Survey
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
          ) : surveys.length > 0 ? (
            <ul>
              {surveys.map((item) => (
                <li key={item._id} className="surveyList">
                  <div className="surveyDesc">
                    <p>Name: {item?.name}</p>
                    <p>Type: {item?.type}</p>
                    <p>Creator: {item?.creator?.username}</p>
                  </div>
                  <Button
                    variant="outline-dark"
                    size="sm"
                    onClick={() =>
                      navigate("/edit/" + item._id + "/" + item.name)
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-dark"
                    size="sm"
                    onClick={() =>
                      navigate("/run/" + item._id + "/" + item.name)
                    }
                  >
                    Run
                  </Button>
                  <Button
                    variant="outline-dark"
                    size="sm"
                    onClick={() => handleDeleteS(item._id)}
                  >
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No Surveys available...</p> // message when no surveys exist
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default MySurveys;
