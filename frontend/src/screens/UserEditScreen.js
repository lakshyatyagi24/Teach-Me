import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate , useParams} from "react-router-dom";
import {  Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { getUserDetails , updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";

const UserEditScreen = () => {

    const { userId } = useParams();   //useParams is a hook that allows you to access the URL parameters
    //const userId = match.params.id;
    // Hooks for navigation and accessing URL parameters
    const navigate = useNavigate();
    //const { search } = useLocation();

    // State for form inputs
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("student"); // Default to "student"


    // Redux hooks for state management and dispatching actions
    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdate = useSelector((state) => state.userUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = userUpdate;

    // useEffect to handle redirection post-login based on "userInfo" state
    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            navigate("/admin/userlist");
        } else {
            if (!user || !user.name || user._id !== userId) {
                dispatch(getUserDetails(userId));
            } else {
                setName(user.name);
                setEmail(user.email);
                setRole(user.isAdmin ? "admin" : "student");
            }
        }
    }, [dispatch, userId, user, navigate, successUpdate]);

    // Handler for form submission
    const submitHandler = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        dispatch(updateUser({ _id: userId, name, email  , isAdmin: role === "admin" }));
    };

  return (
    <>
        <Link to="/admin/userlist" className="btn btn-light my-3">
            Go Back
        </Link>
        <FormContainer className="py-3">
            <h1 className="py-3">Edit User</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
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
                    checked={role === "admin"}
                    onChange={(e) => setRole(e.target.checked ? "admin" : "student")}
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
