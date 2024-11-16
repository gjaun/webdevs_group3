import React from 'react';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function MySurveys(props) {
  const [surveys, setSurveys] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/surveys', {});

        if (!response.ok) {
          throw new Error('Error occured');
        }

        const data = await response.json();
        console.log(data);
        setSurveys(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return (
      <Container>
        <div>Error: {error}</div>
      </Container>
    );
  } else {
    return (
      <Container>
        <Row>
          <Col>
            <h1>My Surveys</h1>
            <ul>
              {surveys.map((item) => {
                return (
                  <li key={item._id} className="surveyList">
                    <div className="surveyDesc">
                      <p>Name: {item.name}</p>
                      <p>Type: {item.type}</p>
                      <p>Creator: {item.creator}</p>
                    </div>
                    <Button variant="outline-dark" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline-dark" size="sm">
                      Run
                    </Button>
                    <Button variant="outline-dark" size="sm">
                      Delete
                    </Button>
                  </li>
                );
              })}
            </ul>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MySurveys;
