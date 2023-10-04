import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listTeacherDoubts } from "../actions/doubtActions";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Accordion from "react-bootstrap/Accordion";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Form from "react-bootstrap/Form";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

const TeacherDoubts = () => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const teacherdoubtList = useSelector((state) => state.teacherdoubtList);
  const { loading, error, teacherdoubts } = teacherdoubtList;

  const teacherLogin = useSelector((state) => state.teacherLogin);
  const { teacherInfo } = teacherLogin;

  useEffect(() => {
    dispatch(listTeacherDoubts());
    if (!teacherInfo) {
      navigate("/");
    }
  }, [dispatch, navigate, teacherInfo]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Container>
      <Row>
        <h1>Welcome to My Doubts Page</h1>
      </Row>
      <Row className="m-2">
        <Form.Control
          type="text"
          placeholder="Search Doubt"
          onChange={handleSearch}
        />
      </Row>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      <Tabs
        defaultActiveKey="alldoubts"
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="alldoubts" title="All Doubts">
          {teacherdoubts
            ?.reverse()
            .filter((searchFiltered) =>
              searchFiltered.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((doubt) => (
              <Row className="mt-3" key={doubt._id}>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Card style={{ margin: "10" }}>
                      <Card.Header style={{ display: "flex" }}>
                        <span
                          style={{
                            color: "black",
                            textDecoration: "none",
                            flex: 1,
                            cursor: "pointer",
                            alignSelf: "center",
                            fontSize: 18,
                          }}
                        >
                          <Accordion.Header>{doubt.title}</Accordion.Header>
                        </span>
                        <div>
                          <Button
                            variant="info"
                            style={{ color: "white" }}
                            href={`/posts/${doubt._id}`}
                          >
                            View Solutions
                          </Button>
                        </div>
                      </Card.Header>
                      <Accordion.Body>
                        <Card.Body>
                          <h4>
                            <Badge bg="success">
                              Status - {doubt.solution_status}
                            </Badge>
                          </h4>
                          <h6>Created by - {doubt.creator_email}</h6>
                          <h5>Subject - {doubt.subject}</h5>
                          <blockquote className="blockquote mb-0">
                            <p>{doubt.description}</p>
                            <footer className="blockquote-footer">
                              Created On - {doubt.createdAt.substring(0, 10)}
                            </footer>
                          </blockquote>
                        </Card.Body>
                      </Accordion.Body>
                    </Card>
                  </Accordion.Item>
                </Accordion>
              </Row>
            ))}
        </Tab>
        <Tab eventKey="solveddoubts" title="Solved Doubts">
          {teacherdoubts
            ?.reverse()
            .filter(
              (filteredDoubt) => filteredDoubt.solution_status === "solved"
            )
            .filter((searchFiltered) =>
              searchFiltered.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((doubt) => (
              <Row className="mt-3" key={doubt._id}>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Card style={{ margin: "10" }}>
                      <Card.Header style={{ display: "flex" }}>
                        <span
                          style={{
                            color: "black",
                            textDecoration: "none",
                            flex: 1,
                            cursor: "pointer",
                            alignSelf: "center",
                            fontSize: 18,
                          }}
                        >
                          <Accordion.Header>{doubt.title}</Accordion.Header>
                        </span>
                        <div>
                          <Button
                            variant="info"
                            style={{ color: "white" }}
                            href={`/posts/${doubt._id}`}
                          >
                            View Solutions
                          </Button>
                        </div>
                      </Card.Header>
                      <Accordion.Body>
                        <Card.Body>
                          <h4>
                            <Badge bg="success">
                              Status - {doubt.solution_status}
                            </Badge>
                          </h4>
                          <h6>Created by - {doubt.creator_email}</h6>
                          <h5>Subject - {doubt.subject}</h5>
                          <blockquote className="blockquote mb-0">
                            <p>{doubt.description}</p>
                            <footer className="blockquote-footer">
                              Created On - {doubt.createdAt.substring(0, 10)}
                            </footer>
                          </blockquote>
                        </Card.Body>
                      </Accordion.Body>
                    </Card>
                  </Accordion.Item>
                </Accordion>
              </Row>
            ))}
        </Tab>
        <Tab eventKey="unsolveddoubts" title="Unsolved Doubts">
          {teacherdoubts
            ?.reverse()
            .filter(
              (filteredDoubt) => filteredDoubt.solution_status === "unsolved"
            )
            .filter((searchFiltered) =>
              searchFiltered.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((doubt) => (
              <Row className="mt-3" key={doubt._id}>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Card style={{ margin: "10" }}>
                      <Card.Header style={{ display: "flex" }}>
                        <span
                          style={{
                            color: "black",
                            textDecoration: "none",
                            flex: 1,
                            cursor: "pointer",
                            alignSelf: "center",
                            fontSize: 18,
                          }}
                        >
                          <Accordion.Header>{doubt.title}</Accordion.Header>
                        </span>
                        <div>
                          <Button
                            variant="info"
                            style={{ color: "white" }}
                            href={`/posts/${doubt._id}`}
                          >
                            View Solutions
                          </Button>
                        </div>
                      </Card.Header>
                      <Accordion.Body>
                        <Card.Body>
                          <h4>
                            <Badge bg="success">
                              Status - {doubt.solution_status}
                            </Badge>
                          </h4>
                          <h6>Created by - {doubt.creator_email}</h6>
                          <h5>Subject - {doubt.subject}</h5>
                          <blockquote className="blockquote mb-0">
                            <p>{doubt.description}</p>
                            <footer className="blockquote-footer">
                              Created On - {doubt.createdAt.substring(0, 10)}
                            </footer>
                          </blockquote>
                        </Card.Body>
                      </Accordion.Body>
                    </Card>
                  </Accordion.Item>
                </Accordion>
              </Row>
            ))}
        </Tab>
      </Tabs>
    </Container>
  );
};

export default TeacherDoubts;
