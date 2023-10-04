import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createQueryAction } from "../actions/postActions";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Button, Card, Form } from "react-bootstrap";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";

const CreateQuery = () => {
  const [solution, setSolution] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const queryCreate = useSelector((state) => state.queryCreate);
  const { loading, error } = queryCreate;

  useEffect(() => {}, []);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createQueryAction(id, solution));
    if (!solution) return;
    navigate(`/queries/${id}`);
  };

  return (
    <div>
      <Container>
        <Row>
          <h1>Welcome to Create Query Page</h1>
        </Row>
        <Row className="m-2">
          <Card>
            <Card.Header>Post new Query</Card.Header>
            <Card.Body>
              <Form onSubmit={submitHandler}>
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                <Form.Group controlId="solution">
                  <Form.Label>Query</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={solution}
                    placeholder="Enter the query"
                    rows={4}
                    onChange={(e) => setSolution(e.target.value)}
                  />
                </Form.Group>
                {loading && <Loading size={50} />}
                <Button type="submit" variant="primary" className="m-2">
                  Post Query
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  );
};

export default CreateQuery;
