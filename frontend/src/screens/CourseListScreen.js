import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listCourses, deleteCourse, createCourse } from '../actions/courseActions';
import { COURSE_CREATE_RESET } from '../constants/courseConstants';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';

const CourseListScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState(0);

    const courseList = useSelector((state) => state.courseList);
    const { loading, error, courses } = courseList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const courseCreate = useSelector((state) => state.courseCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        course: createdCourse,
    } = courseCreate;

    const courseDelete = useSelector((state) => state.courseDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = courseDelete;

    useEffect(() => {
        dispatch({ type: COURSE_CREATE_RESET });
        if (!userInfo || !userInfo.role==="admin") {
            navigate('/login');
        }
        if (successCreate) {
            setName('');
            setDepartment('');
            setDescription('');
            setImage('');
            setPrice(0);
            navigate(`/course/${createdCourse._id}`);
        } else {
            dispatch(listCourses());
        }
    }, [dispatch, navigate, userInfo, successCreate, successDelete, createdCourse]);

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteCourse(id));
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createCourse(name, department, description, image, price));
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            const { data } = await axios.post('/api/upload', formData, config);

            setImage(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>My Courses</h1>
            <Link to='/course/create' className='btn btn-primary my-3'>
                Create Course
            </Link>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <table className='table table-striped table-bordered table-responsive-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>DEPARTMENT</th>
                            <th>DESCRIPTION</th>
                            <th>PRICE</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr key={course._id}>
                                <td>{course._id}</td>
                                <td>{course.name}</td>
                                <td>{course.department}</td>
                                <td>{course.description}</td>
                                <td>${course.price}</td>
                                <td>
                                    <Link to={`/course/${course._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </Link>
                                    <Button
                                        variant='danger'
                                        className='btn-sm'
                                        onClick={() => deleteHandler(course._id)}
                                    >
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CourseListScreen;
