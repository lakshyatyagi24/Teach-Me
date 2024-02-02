// eslint-disable-next-line
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Course from "../components/Course";
import { listCourses } from "../actions/courseActions";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const courseList = useSelector((state) => state.courseList);
  const { loading, error, courses } = courseList;

  //whatever we put inisde the useEffect func will run when the HomeScreen component loads
  //what we want is that our coreses loads to the screen
  useEffect(() => {
    dispatch(listCourses());
  }, [dispatch]);

  return (
    <>
      <h1>Our Courses</h1>
      {loading ? <h2>Loading...</h2> : error ? <h3>{error}</h3> : <Row>
        {courses.map((course) => (
          <Col key={course._id} sm={12} md={6} lg={4} xl={3}>
            <Course course={course} />
          </Col>
        ))}
      </Row>}
      
    </>
  );
};

export default HomeScreen;
