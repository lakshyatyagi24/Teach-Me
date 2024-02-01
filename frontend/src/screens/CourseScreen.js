import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Row, Col, Image, ListGroup } from "react-bootstrap";
import Rating from "../components/Rating";

const CourseScreen = () => {
  const { id } = useParams();

  const [course, setCourse] = useState({});

  useEffect(() => {
    const fetchCourse = async () => {
      const { data } = await axios.get(`/api/courses/${id}`);
      setCourse(data);
    };
    fetchCourse();
  },);

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={course.image} alt={course.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{course.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={course.rating}
                text={`${course.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${course.price}</ListGroup.Item>
            <ListGroup.Item>Description: {course.description}</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default CourseScreen;
