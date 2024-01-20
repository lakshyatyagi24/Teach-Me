import React from "react";
import courses from "../courses";
import { Row, Col } from "react-bootstrap";
import Course from '../components/Course'


const HomeScreen = () => {
  return (
    <>
      <h1>Our Courses</h1>
      <Row>
        {courses.map((course) => (
          <Col key={course._id} sm={12} md={6} lg={4} xl={3}>
          <Course course={course} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
