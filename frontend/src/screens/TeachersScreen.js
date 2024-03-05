import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Teacher from '../components/Teacher';
import { listTeachers } from '../actions/userActions';

const TeachersScreen = () => {
  const { id } = useParams(); // 'id' here is the courseId
  const dispatch = useDispatch();

  const teacherList = useSelector((state) => state.teacherList);
  const { loading, error, teachers } = teacherList;

  useEffect(() => {
    dispatch(listTeachers(id));
  }, [dispatch, id]);

  return (
    <>
      <Link to='/' className='btn btn-light'>Go Back</Link>
      <h1>Our Teachers</h1>
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Row>
          {teachers && teachers.length > 0 ? (
            teachers.map((teacher) => (
              <Col key={teacher._id} sm={12} md={6} lg={4} xl={3}>
                {/* Pass the 'id' as 'courseId' to the Teacher component */}
                <Teacher teacher={teacher} courseId={id} />
              </Col>
            ))
          ) : (
            <Message>No teachers found</Message>
          )}
        </Row>
      )}
    </>
  );
};

export default TeachersScreen;
