import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CreateS from "../assets/images/creates.jpg";
import CreateQ from "../assets/images/createq.jpg";

function Home(props) {
  const navigate = useNavigate();

  return (
    <Container>
      <h1>SimpleSurvey.com</h1>
      <p>
        Welcome to SimpleSurvey.com! A website for building and running simple
        surveys! Register to begin building surveys today.
      </p>
      <div className="homeAlign">
        <div>
          <p className="homeTxt">Simple interface for defining your survey.</p>
          <img
            src={CreateS}
            alt="Create Survey Image"
            className="imgBorder"
          ></img>
        </div>
        <div>
          <p className="homeTxt">
            Defining your question is easy withour interface.
          </p>
          <img
            src={CreateQ}
            alt="Create Questions Image"
            className="imgBorder"
          ></img>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="outline-dark"
          size="lg"
          onClick={() => navigate("/login")}
        >
          Log In
        </Button>
        <Button
          variant="outline-dark"
          size="lg"
          onClick={() => navigate("/registration")}
        >
          Registration
        </Button>
      </div>
    </Container>
  );
}

export default Home;
