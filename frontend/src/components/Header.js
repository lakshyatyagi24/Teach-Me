import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" data-bs-theme="dark" variant="dark" collapseOnSelect >
        <Container>
          <Navbar.Brand href="/">Teach-Me</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/login"><i className="fa-solid fa-user"></i> Sign In</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
