import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate , useParams} from "react-router-dom";
import { Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from '../components/FormContainer';
import { listCourseDetails  , updateCourse} from "../actions/courseActions";
import { COURSE_UPDATE_RESET } from "../constants/courseConstants";


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
    const [uploading, setUploading] = useState(false);


    // Redux hooks for state management and dispatching actions
    const dispatch = useDispatch();

    const courseDetails = useSelector((state) => state.courseDetails);
    const { loading, error, course } = courseDetails;

    const courseUpdate = useSelector((state) => state.courseUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = courseUpdate;

    // useEffect to handle redirection post-login based on "userInfo" state
    useEffect(() => {
        if(successUpdate){
            dispatch({ type: COURSE_UPDATE_RESET });
            navigate("/admin/courselist");
        }else{
            if (!course.name || course._id !== courseId) {
                dispatch(listCourseDetails(courseId));
            } else {
                setName(course.name);
                setPrice(course.price);
                setImage(course.image);
                setCategory(course.category);
                setDescription(course.description);
            }
        }
        
    }, [dispatch, navigate , courseId, course, successUpdate]);

    // Handler for file upload
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]; // Get the file from the form
        const formData = new FormData(); // Create a FormData object
        formData.append("image", file); // Append the file to the form data
        setUploading(true); // Set the uploading state to true
        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data", // Set the content type in the headers to multipart/form-data
                },
            };

            const { data } = await axios.post("/api/upload", formData, config); // Send a POST request to the /api/upload endpoint with the form data and config

            setImage(data); // Set the image state to the data
            setUploading(false); // Set the uploading state to false
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    // Handler for form submission
    const submitHandler = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        dispatch(updateCourse({ _id: courseId, name, price  ,image , category , description }));
    };

  return (
    <>
        <Link to="/admin/courselist" className="btn btn-light my-3">
            Go Back
        </Link>
        <FormContainer className="py-3">
            <h1 className="py-3">Edit Course</h1>
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
                    <Form.Control
                        type="file"
                        id="image-file"
                        onChange={uploadFileHandler}
                    />
                    {uploading && <Loader />}
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
