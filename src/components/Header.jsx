import React from "react";
import Logo from "../assets/images/TeamLogo_Transparent.png";
import { Link, useLocation } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";

function Header() {
  const location = useLocation();
  const path = location.pathname;

  // paths for hide home link
  const isLoginPage = path === "/login";
  const isRegistrationPage = path === "/registration";
  const isMySurveyPage = path === "/mysurveys";
  const isCreatePage = path === "/create";
  const isEditPage = path.startsWith("/edit");
  const isUpdatePage = path.startsWith("/update");
  const isRunPage = path.startsWith("/run");
  const isAddPage = path.startsWith("/add");

  const hideHome =
    isCreatePage ||
    isEditPage ||
    isUpdatePage ||
    isRunPage ||
    isMySurveyPage ||
    isAddPage;

  return (
    <Navbar expand="lg" sticky="top">
      <Container className="d-flex align-items-center">
        <Navbar.Brand>
          <Link to="/">
            <img src={Logo} alt="Webdevs.com Logo image" className="logo" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content">
          <Nav className="me-auto">
            {!hideHome && (
              <Nav.Item className="mx-2">
                <Link to="/" className={path === "/" ? "active" : ""}>
                  Home
                </Link>
              </Nav.Item>
            )}
            {(isLoginPage || isRegistrationPage) && !isMySurveyPage && (
              <>
                <Nav.Item className="mx-2">
                  <Link
                    to="/login"
                    className={path === "/login" ? "active" : ""}
                  >
                    Login
                  </Link>
                </Nav.Item>
                <Nav.Item className="mx-2">
                  <Link
                    to="/registration"
                    className={path === "/registration" ? "active" : ""}
                  >
                    Registration
                  </Link>
                </Nav.Item>
              </>
            )}
            {isMySurveyPage && (
              <Nav.Item className="mx-2">
                <Link
                  to="/mysurveys"
                  className={path === "/mysurveys" ? "active" : ""}
                >
                  My Surveys
                </Link>
              </Nav.Item>
            )}
            {isCreatePage && (
              <>
                <Nav.Item className="mx-2">
                  <Link
                    to="/mysurveys"
                    className={path === "/mysurveys" ? "active" : ""}
                  >
                    My Surveys
                  </Link>
                </Nav.Item>
                <Nav.Item className="mx-2">
                  <Link
                    to="/create"
                    className={path === "/create" ? "active" : ""}
                  >
                    Create Surveys
                  </Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
