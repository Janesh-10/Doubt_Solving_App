import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Accordion from "react-bootstrap/Accordion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteDoubtAction, listDoubts } from "../actions/doubtActions";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

const MyDoubts = () => {
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

  return (
    <Container>
      <Row>
        <h1>Welcome to My Doubts Page</h1>
      </Row>
      <Row>
        <Col>
          <Button variant="primary">All Doubts</Button>
        </Col>
        <Col>
          <Button variant="success">Solved Doubts</Button>
        </Col>
        <Col>
          <Button variant="danger">Unsolved Doubts</Button>
        </Col>
      </Row>
      <Row className="mt-2">
        <Button variant="info" style={{ width: "200px" }}>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/createdoubt"
          >
            Create new doubt
          </Link>
        </Button>
      </Row>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loadingDelete && <Loading />}
      {doubts?.reverse().map((doubt) => (
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
                      <Badge bg="success">Subject - {doubt.subject}</Badge>
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
    </Container>
  );
};

export default MyDoubts;
