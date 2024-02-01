// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Course from "../components/Course";
import axios from 'axios'

const HomeScreen = () => {
  const [courses, setCourses] = useState([]);

  //whatever we put inisde the useEffect func will run when the HomeScreen component loads
  //what we want is that our coreses loads to the screen
  useEffect(() => {
    const fetchCourses = async () => {
      const { data } = await axios.get("/api/courses");
      setCourses(data);
    };
    fetchCourses();
  },[]);

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
