import React from 'react';
import Logo from '../assets/images/TeamLogo_Transparent.png';
import { Link, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';

function Header(props) {
  const location = useLocation();
  const path = location.pathname;

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
              <Link to="/" className={path === '/' ? 'active' : ''}>
                Home
              </Link>
            </Nav.Item>
            <Nav.Item className="mx-2">
              <Link
                to="/mysurveys"
                className={path === '/mysurveys' ? 'active' : ''}
              >
                My Surveys
              </Link>
            </Nav.Item>
            <Nav.Item className="mx-2">
              <Link to="/create" className={path === '/create' ? 'active' : ''}>
                Create Surveys
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
