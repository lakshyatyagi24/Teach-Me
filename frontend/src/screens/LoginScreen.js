import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";

const LoginScreen = () => {
  // Hooks for navigation and accessing URL parameters
  const navigate = useNavigate();
  const { search } = useLocation();

  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redux hooks for state management and dispatching actions
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  // // Extracting the "redirect" parameter from URL, defaulting to home ("/") if not found
  // const redirectInUrl = new URLSearchParams(search);
  // const redirect = redirectInUrl.get("redirect") || "/";
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  // useEffect to handle redirection post-login based on "userInfo" state
  useEffect(() => {
    if (userInfo) {
      // Validation for redirect to prevent open redirection vulnerabilities
      // and ensure navigation only to known routes
      //const isValidRedirect = ["/", "/dashboard", "/profile"].includes(redirect);
      //navigate(redirect);
    }
  }, [dispatch]/*[navigate, userInfo, redirect]*/);

  // Handler for form submission
  const submitHandler = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    dispatch(login(email, password)); // Dispatch login action with form data
  };

  return (
    <FormContainer className="py-3">
      <h1 className="py-3">Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label style={{ margin: "10px" }}>Email Address</Form.Label>
          <Form.Control
            style={{ margin: "10px" }}
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label style={{ margin: "10px" }}>Password</Form.Label>
          <Form.Control
            style={{ margin: "10px" }}
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="py-3"
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" style={{ margin: "10px" }}>
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Student?{" "}
          <Link to={redirectInUrl ? `/register/student?redirect=${redirect}` : "/register/student"}>
            Register
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          New Teacher?{" "}
          <Link to={redirectInUrl ? `/register/teacher?redirect=${redirect}` : "/register/teacher"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
