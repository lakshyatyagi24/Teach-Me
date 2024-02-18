import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { registerStudent } from "../actions/userActions";

const StudentRegisterScreen = () => {
  // Hooks for navigation and accessing URL parameters
  const navigate = useNavigate();
  const { search } = useLocation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [studentId, setStudentId] = useState('');
  const [studentDepartment, setStudentDepartment] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(null);

  // Redux hooks for state management and dispatching actions
  const dispatch = useDispatch();
  const studentRegister = useSelector((state) => state.studentRegister);
  const { loading, error, userInfo } = studentRegister;

  // Extracting the "redirect" parameter from URL, defaulting to home ("/") if not found
  const redirectInUrl = new URLSearchParams(search);
  const redirect = redirectInUrl.get("redirect") || "/";

  // useEffect to handle redirection post-login based on "userInfo" state
  useEffect(() => {
    if (userInfo) {
      // Validation for redirect to prevent open redirection vulnerabilities
      // and ensure navigation only to known routes
      const isValidRedirect = ["/", "/dashboard", "/profile"].includes(redirect);
      navigate(isValidRedirect ? redirect : '/');
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(registerStudent(name, email, password, studentId, studentDepartment, phone));
    }
  };

  return (
    <FormContainer className="py-3">
      <h1 className="py-3">Sign Up - New Student</h1>
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

        <Form.Group controlId="studentId">
          <Form.Label style={{ margin: "10px" }}>Student ID</Form.Label>
          <Form.Control
            style={{ margin: "10px" }}
            type="studentId"
            placeholder="Enter Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="py-3"
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="studentDepartment">
          <Form.Label style={{ margin: "10px" }}>Department</Form.Label>
          <Form.Select value={studentDepartment}onChange={(e) => setStudentDepartment(e.target.value)}>
                <option value=""></option>
                <option value="Software">Software</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Electrical">Electrical</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Industrial Management">Industrial Management</option>  
                </Form.Select>
        </Form.Group>

        <Form.Group controlId="phone">
          <Form.Label style={{ margin: "10px" }}>Phone</Form.Label>
          <Form.Control
            style={{ margin: "10px" }}
            type="phone"
            placeholder="Enter Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="py-3"
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" style={{ margin: "10px" }}>
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an Account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

/*   <Row className="py-3">
<Col>
  Have an Account? <Link to="/login">Login</Link>
</Col>
</Row>*/

export default StudentRegisterScreen;
