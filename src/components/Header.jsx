import React from 'react';
import Logo from '../assets/images/TeamLogo_Transparent.png';
import { Link, useLocation } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';

function Header() {
  const location = useLocation();
  const path = location.pathname;
  return (
    <>
    <h1>SimpleSurvey.com</h1>
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
              <Link to="/" className={path === '/' ? 'active' : ''}>
                Home
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}

export default Header;
