import React, { useEffect } from "react";
import "./Landingpage.css";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

const Landingpage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    const teacherInfo = localStorage.getItem("teacherInfo");
    if (userInfo) {
      navigate("/mydoubts");
    }
    if (teacherInfo) {
      navigate("/teacherdoubts");
    }
  }, [navigate]);

  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h3 className="title">Welcome to Doubt Solver</h3>
              <p className="subtitle">
                A single place to find solutions of all your doubts
              </p>
            </div>
          </div>
        </Row>
        <Row>
          <Col>
            <Card style={{ width: "20rem" }}>
              <Card.Body>
                <Card.Title>Teacher Portal</Card.Title>
                <Card.Text>
                  All Teachers please login or register here
                </Card.Text>
                <Container>
                  <Row>
                    <Col>
                      <Button variant="primary" href="teacherlogin">
                        Login
                      </Button>
                    </Col>
                    <Col>
                      <Button variant="success" href="teacherregister">
                        Register
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "20rem" }} className="ms-auto">
              <Card.Body>
                <Card.Title>Student Portal</Card.Title>
                <Card.Text>
                  All Students please login or register here
                </Card.Text>
                <Container>
                  <Row>
                    <Col>
                      <Button variant="primary" href="/studentlogin">
                        Login
                      </Button>
                    </Col>
                    <Col>
                      <Button variant="success" href="/studentregister">
                        Register
                      </Button>
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
