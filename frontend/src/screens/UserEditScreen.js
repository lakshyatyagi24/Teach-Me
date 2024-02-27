import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate , useParams} from "react-router-dom";
import {  Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { getUserDetails } from "../actions/userActions";

const UserEditScreen = () => {

    const {userId} = useParams();   //useParams is a hook that allows you to access the URL parameters
    //const userId = match.params.id;
    // Hooks for navigation and accessing URL parameters
    const navigate = useNavigate();
    //const { search } = useLocation();

    // State for form inputs
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);


    // Redux hooks for state management and dispatching actions
    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    // useEffect to handle redirection post-login based on "userInfo" state
    useEffect(() => {
        if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
        } else {
            // Check if user is defined before trying to access its properties
            if (user) {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }

    }, [dispatch, userId , user , navigate]);

    // Handler for form submission
    const submitHandler = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
    };

  return (
    <>
        <Link to="/admin/userlist" className="btn btn-light my-3">
            Go Back
        </Link>
        <FormContainer className="py-3">
            <h1 className="py-3">Edit User</h1>
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> :(
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
        
                <Form.Group controlId="isadmin">
                    <Form.Check
                    type="checkbox"
                    label="Is Admin"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                    ></Form.Check>
                </Form.Group>
    
                <Button type="submit" variant="primary" style={{ margin: "10px" }}>
                    Update
                </Button>
            </Form>
            )}
        </FormContainer>
    </>
  );
};

export default UserEditScreen;
