import React, { useEffect, useState } from "react";
import Logo from "../assets/images/TeamLogo_Transparent.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Button } from "react-bootstrap";

function Header() {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  // paths for hide links
  const isCreatePage = path === "/create";
  const isEditPage = path.startsWith("/edit");
  const isUpdatePage = path.startsWith("/update");
  const isRunPage = path.startsWith("/run");
  const isAddPage = path.startsWith("/add");

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // check isAuthenticated or not
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, [location]);

  const handleLogout = async () => {
    try {
      // Call the backend logout endpoint (optional)
      alert("logging out...");
      localStorage.removeItem("authToken");

      navigate("/login");
      // const response = await fetch(
      //   "https://webdevs-group3-backend.onrender.com/auth/logout",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      // if (response.status === 200) {
      //   // Clear token from localStorage
      //   localStorage.removeItem("authToken");

      //   // Redirect to the login page
      //   navigate("/login");
      // } else {
      //   console.error("Failed to log out");
      // }
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  return (
    <Navbar expand="lg" sticky="top" className="navbar justify-content-end">
      <Container className="d-flex align-items-center">
        <Navbar.Brand>
          <Link to="/">
            <img src={Logo} alt="Webdevs.com Logo image" className="logo" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav className="justify-content-end">
            <Nav.Item className="mx-2">
              <Link to="/" className={path === "/" ? "active" : ""}>
                Home
              </Link>
            </Nav.Item>
            {!isAuthenticated && (
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
            {isAuthenticated && (
              <>
                <Nav.Item className="mx-2">
                  <Link
                    to="/mysurveys"
                    className={path === "/mysurveys" ? "active" : ""}
                  >
                    My Surveys
                  </Link>
                </Nav.Item>
              </>
            )}

            {isEditPage && (
              <Nav.Item className="mx-2">
                <Link to="/edit" className={isEditPage ? "active" : ""}>
                  Edit
                </Link>
              </Nav.Item>
            )}
            {isUpdatePage && (
              <Nav.Item className="mx-2">
                <Link to="/update" className={isUpdatePage ? "active" : ""}>
                  Update
                </Link>
              </Nav.Item>
            )}
            {isRunPage && (
              <Nav.Item className="mx-2">
                <Link to="/run" className={isRunPage ? "active" : ""}>
                  Run
                </Link>
              </Nav.Item>
            )}
            {isAddPage && (
              <Nav.Item className="mx-2">
                <Link to="/add" className={isAddPage ? "active" : ""}>
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
            {isAuthenticated && (
              <Nav.Item className="mx-2">
                <Button
                  variant="outline-dark"
                  className="logout"
                  size="md"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
