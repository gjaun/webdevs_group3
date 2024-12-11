import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CreateS from "../assets/images/happyimg2.jpg";
import welcomemsg from "../assets/images/welcomemsg.png";
import CreateQ from "../assets/images/happyimg3.jpg";

function Home(props) {
  const navigate = useNavigate();

  return (
    <Container className="homepage">
      <p className="wecomeTxt">
        Welcome to webDevs.com! A website for building and running simple
        surveys! Register to begin building surveys today.
      </p>
      <h3>How Our Survey Site Works</h3>
      <div className="explainAlign">
        <div className="innerTxt">
          <h4 className="numbering">1</h4>
          <h4 className="headTitle">Free Registration</h4>
          <p className="sequenceTxt">Register for free and start building your own custom surveys instantly!</p>
        </div>
        <div className="innerTxt"> 
          <h4 className="numbering">2</h4>
          <h4 className="headTitle">Build Surveys</h4>
          <p className="sequenceTxt">In just a few easy steps create a survey and build your questions.</p>
        </div>
        <div className="innerTxt">
          <h4 className="numbering">3</h4>
          <h4 className="headTitle">Run Surveys</h4>
          <p className="sequenceTxt">Run your surveys and view the results.</p>
        </div>
      </div>
      <div className="split">
      <div className="homeAlign">
        <div>
          <img
            src={CreateS}
            alt="Create Survey Image"
            className="imgBorder"
          ></img>
        </div>
        <div className="vertAlign2">
          <p className="homeTxt">Build Surveys in Just 3 Steps</p>
          <p className="descTxt"><b>Step 1:</b> Click on the create survey button in the MySurveys hub. Fill out the name and type of survey to create your first survey!</p>
          <p className="descTxt"><b>Step 2:</b> Find your survey in the MySurveys hub, select the edit button to veiw all question and from here add, edit or delete questions from your survey.</p>
          <p className="descTxt"><b>Step 3:</b> Find your survey in the MySurveys hub, select the run button to run your survey.</p>
        </div>
      </div>
      </div>
      <div className="split">
      <div className="homeAlign">
        <div className="vertAlign">
          <p className="homeTxt">Easy to Understand and Easy to Use</p>
          <p className="descTxt2">Our site is designed to be easy to use and understand. Surveys on our site are flexible for all your needs. Follow our three easy steps to get building surveys fast.</p>
          <p className="descTxt2"></p>
        </div>
        <div className="img2">
          <img
            src={CreateQ}
            alt="Create Survey Image"
            className="imgBorder3"
          ></img>
        </div>
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
