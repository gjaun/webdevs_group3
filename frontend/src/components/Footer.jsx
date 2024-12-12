import React from "react";
import Logo from "../assets/images/TeamLogo_Transparent.png";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer(props) {
  return (
    <footer>
      <Container fluid className="mt-5">
        <Row>
          <Col></Col>
          <Col></Col>
          <Col>
            <Link to="/">
              <img src={Logo} alt="Webdevs.com logo image" className="logo" />
            </Link>
          </Col>
          <Col>
            <h5 style={{ fontSize: "12px" }}>Developed by Webdevs.com</h5>
            <p style={{ fontSize: "12px" }}>
              Copyright© All rights reserved by Webdevs.com
            </p>
            <p style={{ fontSize: "12px" }}>December, 2024</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
