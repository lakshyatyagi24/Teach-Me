import React , { useEffect , useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation , useParams} from 'react-router-dom';
import { listCourses, deleteCourse, createCourse } from '../actions/courseActions';
import { COURSE_CREATE_RESET } from '../constants/courseConstants';
import axios from 'axios';
import { Form, Button , Row , Col , Table } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { LinkContainer } from 'react-router-bootstrap';

const CourseListScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //const { keyword } = useParams();


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
        
        if (!userInfo.role==='admin') {
            navigate('/login');
        }
        if (successCreate) {
            navigate(`/admin/course/${createdCourse._id}/edit`);
        } else {
            dispatch(listCourses());
        }

    }, [dispatch, navigate, userInfo , successDelete , successCreate , createdCourse]);

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteCourse(id));
        }
    };

    const createCourseHandler = () => {
        dispatch(createCourse());
        //dispatch({ type: COURSE_CREATE_RESET });
        //navigate('/admin/course/create');
    };


    /*const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createCourse(name, department, description, image, price));
    };*/

    /*const uploadFileHandler = async (e) => {
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
    };*/

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Courses</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createCourseHandler}>
                        <i className='fas fa-plus'></i> Create Course
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}


            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>DEPARTMENT</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr key={course._id}>
                                <td>{course._id}</td>
                                <td>{course.name}</td>
                                <td>
                                    ${course.price}
                                </td>
                                <td>
                                    {course.category}
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/course/${course._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
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
                </Table>
            )}
        </>
    );
};

export default CourseListScreen;
