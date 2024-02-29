import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate , useParams} from "react-router-dom";
import {  Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listCourseDetails } from "../actions/courseActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";

const CourseEditScreen = () => {

    const { courseId } = useParams();   //useParams is a hook that allows you to access the URL parameters
    //const courseId = match.params.id;
    // Hooks for navigation and accessing URL parameters
    const navigate = useNavigate();
    //const { search } = useLocation();

    // State for form inputs
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");


    // Redux hooks for state management and dispatching actions
    const dispatch = useDispatch();
    const courseDetails = useSelector((state) => state.courseDetails);
    const { loading, error, course } = courseDetails;

    /*const userUpdate = useSelector((state) => state.userUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = userUpdate;*/

    // useEffect to handle redirection post-login based on "userInfo" state
    useEffect(() => {
            if (!course || !course.name || course._id !== courseId) {
                dispatch(listCourseDetails(courseId));
            } else {
                setName(course.name);
                setPrice(course.price);
                setImage(course.image);
                setCategory(course.category);
                setDescription(course.description);
            }
    }, [dispatch, courseId, course, navigate]);

    // Handler for form submission
    const submitHandler = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        //dispatch(updateUser({ _id: userId, name, email  , isAdmin: role === "admin" }));
    };

  return (
    <>
        <Link to="/admin/courselist" className="btn btn-light my-3">
            Go Back
        </Link>
        <FormContainer className="py-3">
            <h1 className="py-3">Edit Course</h1>
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
                <Form.Group controlId="price">
                    <Form.Label style={{ margin: "10px" }}>Price</Form.Label>
                    <Form.Control
                    style={{ margin: "10px" }}
                    type="number"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="image">
                    <Form.Label style={{ margin: "10px" }}>Image</Form.Label>
                    <Form.Control
                        style={{ margin: "10px" }}
                        type="text"
                        placeholder="Enter image url"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="Department">
                    <Form.Label style={{ margin: "10px" }}>Department</Form.Label>
                    <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
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

                

                <Form.Group controlId="description">
                    <Form.Label style={{ margin: "10px" }}>Description</Form.Label>
                    <Form.Control
                        style={{ margin: "10px" }}
                        type="text"
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></Form.Control>
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

export default CourseEditScreen;
