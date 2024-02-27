// eslint-disable-next-line
import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import { LinkContainer } from "react-router-bootstrap";
import { Container, Nav, Navbar , NavDropdown} from "react-bootstrap";
import {logout} from '../actions/userActions';
import SearchBox  from "./SearchBox.js"; // Add this line

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state)=> state.userLogin)
  const {userInfo} = userLogin

  const logoutHandler = () =>{
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg="dark" data-bs-theme="dark" variant="dark" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Teach-Me</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <SearchBox />
            <Nav className="ms-auto">
              {userInfo ? (
                <NavDropdown title = {userInfo.name} id ='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ): <LinkContainer to="/login">
              <Nav.Link>
                <i className="fa-solid fa-user"></i> Sign In
              </Nav.Link>
            </LinkContainer>}
                {userInfo && userInfo.role==="admin" && (
                  <NavDropdown title='Admin' id='adminmenu'>
                    <LinkContainer to='/admin/userlist'>
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/courselist'>
                      <NavDropdown.Item>Courses</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </header>
  );
};

export default Header;
