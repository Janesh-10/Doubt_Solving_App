import React from "react";
import "./Landingpage.css";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Landingpage = () => {
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to Doubt Solver</h1>
              <p className="subtitle">
                A single place to find solutions of all your doubts
              </p>
            </div>
          </div>
        </Row>
        <Row>
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Teacher Portal</Card.Title>
                <Card.Text>Teachers login or register here</Card.Text>
                <Container>
                  <Row>
                    <Col>
                      <Button variant="primary">Login</Button>
                    </Col>
                    <Col>
                      <Button variant="success">Register</Button>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "18rem" }} className="ms-auto">
              <Card.Body>
                <Card.Title>Student Portal</Card.Title>
                <Card.Text>Students login or register here</Card.Text>
                <Container>
                  <Row>
                    <Col>
                      <Button variant="primary">Login</Button>
                    </Col>
                    <Col>
                      <Button variant="success">Register</Button>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Landingpage;
