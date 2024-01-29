import React from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import courses from "../courses";

const CourseScreen = ({match}) => {
    const { id } = useParams();
    const course = courses.find((p) => p._id === id);

  return <div>{course.name}</div>;
};

export default CourseScreen;
