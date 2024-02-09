import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
//import FormContainer from "../components/FormContainer";
import { getUserDetails } from "../actions/userActions";

const ProfileScreen = () => {
  // Hooks for navigation and accessing URL parameters
  const navigate = useNavigate();
  const { search } = useLocation();

  // State for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  // Redux hooks for state management and dispatching actions
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo} = userLogin;
  // Extracting the "redirect" parameter from URL, defaulting to home ("/") if not found
  const redirectInUrl = new URLSearchParams(search);
  const redirect = redirectInUrl.get("redirect") || "/";

  // useEffect to handle redirection post-login based on "userInfo" state
  useEffect(() => {
    if (!userInfo) {
        navigate('/login');
    } else {
        // Ensure 'user' is defined before attempting to access its properties
        if (!user || !user.name) {
            dispatch(getUserDetails('profile'));
        } else {
            setName(user.name);
            setEmail(user.email);
        }
    }
}, [dispatch, navigate, userInfo, user]);


  // Handler for form submission
  const submitHandler = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if(password!==confirmPassword){
        setMessage('Password do not match')
    }else{
        // DISPATCH update profile
    }
  };

  return <Row>
    <Col md = {3}>
    <h2 className="py-3">User Profile</h2>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
      <Form.Group controlId="name">
          <Form.Label style={{ margin: "10px" }}>Name</Form.Label>
          <Form.Control
            style={{ margin: "10px" }}
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
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
          <Form.Label style={{ margin: "10px" }}>Password Address</Form.Label>
          <Form.Control
            style={{ margin: "10px" }}
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="py-3"
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label style={{ margin: "10px" }}>Confirm Password</Form.Label>
          <Form.Control
            style={{ margin: "10px" }}
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="py-3"
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" style={{ margin: "10px" }}>
          Update
        </Button>
      </Form>
    </Col>
    <Col md = {9}>
        <h2>My Orders</h2>
    </Col>
  </Row>
};

export default ProfileScreen;
