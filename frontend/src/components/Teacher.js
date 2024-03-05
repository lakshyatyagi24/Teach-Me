import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "react-bootstrap";
import Rating from "./Rating";
import Message from "./Message";

const Teacher = ({ teacher, courseId }) => {
  if (!teacher) {
    // Error handling if teacher is undefined
    console.error('Teacher prop is undefined');
    return <Message>Teacher information is missing</Message>;
  }

  return (
    <Card className="my-3 p-3 rounded">
      {/* Use the 'courseId' prop to construct the link */}
      <Link to={`/course/${courseId}/${teacher._id}/schedule`}>
        <Card.Img src={teacher.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/course/${courseId}/${teacher._id}/schedule`}>
          <Card.Title as="div" style={{ textAlign: "center" }}>
            {teacher.name}
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <CardBody>
            <strong>{teacher.name}</strong>
          </CardBody>
          <Rating
            value={teacher.rating}
            text={` ${teacher.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as="h3">${teacher.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Teacher;
