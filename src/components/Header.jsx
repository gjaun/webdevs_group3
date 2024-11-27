import React from "react";
import Logo from "../assets/images/TeamLogo_Transparent.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";

function Header() {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  // paths for hide home link
  const isLoginPage = path === "/login";
  const isRegistrationPage = path === "/registration";
  const isMySurveyPage = path === "/mysurveys";
  const isCreatePage = path === "/create";
  const isEditPage = path.startsWith("/edit");
  const isUpdatePage = path.startsWith("/update");
  const isRunPage = path.startsWith("/run");
  const isAddPage = path.startsWith("/add");

    const handleLogout = async () => {
      try {
        const response = await fetch("http://localhost:8080/auth/logout", {
          method: "POST",
          credentials: "include", // include cookies
        });
  
        if (response.ok) {
          alert("You have been logged out");
          window.globalVariable = false;
          window.globalVariable2 = true;
          navigate("/"); // redirect to home page
        } else {
          throw new Error("Logout failed");
        }
      } catch (err) {
        console.log("Error during logout: ", err.message);
        alert("An error occurred while logging out", err.message);
      }
    };

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
              <Nav.Item className="mx-2">
                <Link to="/" className={path === "/" ? "active" : ""}>
                  Home
                </Link>
              </Nav.Item>
            {(window.globalVariable2 || isLoginPage || isRegistrationPage) && (
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
            {(window.globalVariable) && (
              <Nav.Item className="mx-2">
                <Link
                  to="/mysurveys"
                  className={path === "/mysurveys" ? "active" : ""}
                >
                  My Surveys
                </Link>
              </Nav.Item>
            )}
            {window.globalVariable && (
              <Nav.Item className="mx-2">
                <Link
                  onClick={() => handleLogout()}
                >
                  Logout
                </Link>
              </Nav.Item>
            )}
            {isEditPage && (
              <Nav.Item className="mx-2">
                <Link
                  to="/edit"
                  className={path === "/edit" ? "active" : ""}
                >
                  Edit
                </Link>
              </Nav.Item>
            )}
            {isUpdatePage && (
              <Nav.Item className="mx-2">
                <Link
                  to="/update"
                  className={path === "/update" ? "active" : ""}
                >
                  Update
                </Link>
              </Nav.Item>
            )}
            {isRunPage && (
              <Nav.Item className="mx-2">
                <Link
                  to="/run"
                  className={path === "/run" ? "active" : ""}
                >
                  Run
                </Link>
              </Nav.Item>
            )}
            {isAddPage && (
              <Nav.Item className="mx-2">
                <Link
                  to="/add"
                  className={path === "/add" ? "active" : ""}
                >
                  Add
                </Link>
              </Nav.Item>
            )}
            {isCreatePage && (
              <>
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
