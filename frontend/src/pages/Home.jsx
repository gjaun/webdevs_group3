import React from "react";
import { Container, Button, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import happyone from "../assets/images/happyimg2.jpg";
import happythree from "../assets/images/happyimg4.jpg";
import happytwo from "../assets/images/happyimg3.jpg";

function Home(props) {
  const navigate = useNavigate();

  return (
    <Container>
      <Row className="home">
        <Col md={6} className="home_text">
          <h1 className="welcomeTxt">Welcome to webDevs.com!</h1>
          <h5>
            A website for building and running simple surveys! Register to begin
            building surveys today!
          </h5>
          <div className="homebutton_group">
            <Button
              variant="outline-dark"
              size="lg"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              variant="outline-dark"
              size="lg"
              onClick={() => navigate("/registration")}
            >
              Register
            </Button>
          </div>
        </Col>
        <Col md={6}>
          <Image
            src={happythree}
            alt="Create Survey Image"
            style={{ width: "100%" }}
          />
        </Col>
      </Row>
      <Row className="how">
        <h2 className="siteTxt">How Our Survey Site Works</h2>
        <Col md={4}>
          <div className="innerTxt">
            <h4>1. Free Registration</h4>
            <p className="sequenceTxt">
              Register for free and start building your own custom surveys
              instantly!
            </p>
          </div>
        </Col>
        <Col md={4}>
          <div className="innerTxt">
            <h4>2. Build Surveys</h4>
            <p className="sequenceTxt">
              In just a few easy steps create a survey and build your questions.
            </p>
          </div>
        </Col>
        <Col md={4}>
          <div className="innerTxt">
            <h4>3. Run Surveys</h4>
            <p className="sequenceTxt">
              Run your surveys and view the results.
            </p>
          </div>
        </Col>
      </Row>
      <Row className="steps">
        <Col md={6}>
          <img
            src={happyone}
            alt="Create Survey Image"
            style={{ width: "100%" }}
          ></img>
        </Col>
        <Col md={6}>
          <div>
            <h4>Build Surveys in Just 3 Steps</h4>
            <p className="descTxt">
              <strong>Step 1:</strong> Click on the create survey button in the
              MySurveys hub. Fill out the name and type of survey to create your
              first survey!
            </p>
            <p className="descTxt">
              <strong>Step 2:</strong> Find your survey in the MySurveys hub,
              select the edit button to veiw all question and from here add,
              edit or delete questions from your survey.
            </p>
            <p className="descTxt">
              <strong>Step 3:</strong> Find your survey in the MySurveys hub,
              select the run button to run your survey.
            </p>
          </div>
        </Col>
      </Row>
      <Row className="easy">
        <Col md={6}>
          <div>
            <h4>Easy to Understand and Easy to Use</h4>
            <p className="descTxt">
              <strong>Step 1:</strong> Our site is designed to be easy to use
              and understand.
            </p>
            <p className="descTxt">
              <strong>Step 2:</strong> Surveys on our site are flexible for all
              your needs.
            </p>
            <p className="descTxt">
              <strong>Step 3:</strong> Follow our three easy steps to get
              building surveys fast.
            </p>
          </div>
        </Col>
        <Col md={6}>
          <img
            src={happytwo}
            alt="Create Survey Image"
            style={{ width: "100%" }}
          ></img>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
