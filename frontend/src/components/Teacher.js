import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "react-bootstrap";
import Rating from "./Rating";
import teachers from "../teachers";

const Teacher = ({teachers}) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/teacher/${teachers._id}`}>
        <Card.Img src={teachers.image} variant="top" />
      </Link>

      <Card.Body>
        <a href={`/teacher/${teachers._id}`}>
          <Card.Title as="div" style={{ textAlign: "center" }}>
            {teachers.name}
          </Card.Title>
        </a>
        <Card.Text as="div">
          <CardBody>
            <strong>{teachers.name}</strong>
          </CardBody>
          <Rating
            value={teachers.rating}
            text={` ${teachers.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as="h3">${teachers.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Teacher;
