import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "react-bootstrap";
import Rating from "./Rating";

const Teacher = ({teacher}) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/teacher/${teacher._id}`}>
        <Card.Img src={teacher.image} variant="top" />
      </Link>

      <Card.Body>
        <a href={`/teacher/${teacher._id}`}>
          <Card.Title as="div" style={{ textAlign: "center" }}>
            {teacher.name}
          </Card.Title>
        </a>
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
