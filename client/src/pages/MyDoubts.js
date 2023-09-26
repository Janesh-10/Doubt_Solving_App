import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Accordion from "react-bootstrap/Accordion";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteDoubtAction, listDoubts } from "../actions/doubtActions";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

const MyDoubts = () => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const doubtList = useSelector((state) => state.doubtList);
  const { loading, error, doubts } = doubtList;

  const studentLogin = useSelector((state) => state.studentLogin);
  const { userInfo } = studentLogin;

  const doubtCreate = useSelector((state) => state.doubtCreate);
  const { success: successCreate } = doubtCreate;

  const doubtUpdate = useSelector((state) => state.doubtUpdate);
  const { success: successUpdate } = doubtUpdate;

  const doubtDelete = useSelector((state) => state.doubtDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = doubtDelete;

  useEffect(() => {
    dispatch(listDoubts());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successCreate,
    successUpdate,
    successDelete,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteDoubtAction(id));
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Container>
      <Row>
        <h1>Welcome to My Doubts Page</h1>
      </Row>
      <Row className="m-2">
        <Button
          variant="success"
          href="/createdoubt"
          style={{ width: "200px" }}
        >
          Create new doubt
        </Button>
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
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loadingDelete && <Loading />}
      <Tabs
        defaultActiveKey="alldoubts"
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="alldoubts" title="All Doubts">
          {doubts
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
                          <Button variant="info" style={{ color: "white" }}>
                            View Solution
                          </Button>
                          <Button
                            variant="primary"
                            className="mx-2"
                            href={`/doubt/${doubt._id}`}
                          >
                            Edit Doubt
                          </Button>
                          <Button
                            variant="danger"
                            className="mx-2"
                            onClick={() => deleteHandler(doubt._id)}
                          >
                            Delete Doubt
                          </Button>
                        </div>
                      </Card.Header>
                      <Accordion.Body>
                        <Card.Body>
                          <h4>
                            <Badge bg="success">
                              Subject - {doubt.subject}
                            </Badge>
                          </h4>
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
          {doubts
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
                          <Button variant="info" style={{ color: "white" }}>
                            View Doubt
                          </Button>
                          <Button
                            variant="primary"
                            className="mx-2"
                            href={`/doubt/${doubt._id}`}
                          >
                            Edit Doubt
                          </Button>
                          <Button
                            variant="danger"
                            className="mx-2"
                            onClick={() => deleteHandler(doubt._id)}
                          >
                            Delete Doubt
                          </Button>
                        </div>
                      </Card.Header>
                      <Accordion.Body>
                        <Card.Body>
                          <h4>
                            <Badge bg="success">
                              Subject - {doubt.subject}
                            </Badge>
                          </h4>
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
          {doubts
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
                          <Button variant="info" style={{ color: "white" }}>
                            View Doubt
                          </Button>
                          <Button
                            variant="primary"
                            className="mx-2"
                            href={`/doubt/${doubt._id}`}
                          >
                            Edit Doubt
                          </Button>
                          <Button
                            variant="danger"
                            className="mx-2"
                            onClick={() => deleteHandler(doubt._id)}
                          >
                            Delete Doubt
                          </Button>
                        </div>
                      </Card.Header>
                      <Accordion.Body>
                        <Card.Body>
                          <h4>
                            <Badge bg="success">
                              Subject - {doubt.subject}
                            </Badge>
                          </h4>
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

export default MyDoubts;
