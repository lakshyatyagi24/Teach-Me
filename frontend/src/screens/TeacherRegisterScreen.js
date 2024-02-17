import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { registerTeacher } from "../actions/userActions";

const TeacherRegisterScreen = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [teacherId, setTeacherId] = useState(null);
  const [teacherDepartment, setTeacherDepartment] = useState(null);
  const [course, setCourse] = useState(null);
  const [price, setPrice] = useState(null);
  const [grade, setGrade] = useState(null);
  const [phone, setPhone] = useState(null);


  const dispatch = useDispatch();

  // Corrected useSelector hook to access the right state slice
  const teacherRegister = useSelector((state) => state.teacherRegister);
  const { loading, error, userInfo } = teacherRegister;

  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  // Redirect to home screen after successful registration
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      // Fix: Pass object directly to match the action creator's parameter
      dispatch(registerTeacher( name , email , password , teacherId , teacherDepartment , course , price , grade , phone ));
    }
  };

  return (
    <FormContainer className="py-3">
      <h1 className="py-3">Sign Up - New Teacher</h1>
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
        <Form.Group controlId="teacherId">
          <Form.Label style={{ margin: "10px" }}>TeacherID</Form.Label>
          <Form.Control
            style={{ margin: "10px" }}
            type="teacherId"
            placeholder="teacherId"
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
            className="py-3"
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="teacherDepartment">
          <Form.Label style={{ margin: "10px" }}>Department</Form.Label>
          <Form.Select value={teacherDepartment}onChange={(e) => setTeacherDepartment(e.target.value)}>
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

        <Form.Group controlId="course">
          <Form.Label style={{ margin: "10px" }}>Course</Form.Label>
          <Form.Control
            style={{ margin: "10px" }}
            type="course"
            placeholder="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="py-3"
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label style={{ margin: "10px" }}>Price</Form.Label>
          <Form.Control
            style={{ margin: "10px" }}
            type="price"
            placeholder="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="py-3"
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="grade">
          <Form.Label style={{ margin: "10px" }}>Grade</Form.Label>
          <Form.Control
            style={{ margin: "10px" }}
            type="grade"
            placeholder="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="py-3"
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="phone">
          <Form.Label style={{ margin: "10px" }}>Phone</Form.Label>
          <Form.Control
            style={{ margin: "10px" }}
            type="phone"
            placeholder="phone"
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

export default  TeacherRegisterScreen;
