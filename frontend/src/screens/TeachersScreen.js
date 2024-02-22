import React from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup } from "react-bootstrap";
import Rating from "../components/Rating";
import teachers from "../teachers";
import Teacher from "../components/Teacher";

const TeachersScreen = () => {
  const { id } = useParams();

  const teacher = teachers.find((t) => t._id === id);
  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      <Row>
        {teachers.map((teachers) => (
          <Col key={teachers._id} sm={12} md={6} lg={4} xl={3}>
            <Teacher teachers={teachers} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default TeachersScreen;
