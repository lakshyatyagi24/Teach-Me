import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from "react-bootstrap";
import Rating from "../components/Rating";
import courses from "../courses";

const CourseScreen = () => {
  const { id } = useParams();
  const course = courses.find((p) => p._id === id);

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
