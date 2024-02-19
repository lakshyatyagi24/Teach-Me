// eslint-disable-next-line
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Course from "../components/Course";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listCourses } from "../actions/courseActions";
import { useParams } from "react-router-dom"; // Import useParams to get the keyword from the URL

const HomeScreen = ({match}) => {
  const { keyword } = useParams(); // Use useParams to get the keyword from the URL
  // const keyword = match.params.keyword;

  const dispatch = useDispatch();

  const courseList = useSelector((state) => state.courseList);
  const { loading, error, courses } = courseList;

  //whatever we put inisde the useEffect func will run when the HomeScreen component loads
  //what we want is that our coreses loads to the screen
  useEffect(() => {
    dispatch(listCourses(keyword));
  }, [dispatch , keyword]); // Add keyword to dependency array

  return (
    <>
      <h1>Our Courses</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {courses.map((course) => (
            <Col key={course._id} sm={12} md={6} lg={4} xl={3}>
              <Course course={course} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
