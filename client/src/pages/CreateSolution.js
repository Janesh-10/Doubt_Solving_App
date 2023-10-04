import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { createSolutionAction } from "../actions/postActions";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";

const CreateSolution = () => {
  const [solution, setSolution] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const solutionCreate = useSelector((state) => state.solutionCreate);
  const { loading, error } = solutionCreate;

  useEffect(() => {}, []);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createSolutionAction(id, solution));
    if (!solution) return;
    navigate(`/posts/${id}`);
  };

  return (
    <div>
      <Container>
        <Row>
          <h1>Welcome to Create Solution Page</h1>
        </Row>
        <Row className="m-2">
          <Card>
            <Card.Header>Post new Solution</Card.Header>
            <Card.Body>
              <Form onSubmit={submitHandler}>
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                <Form.Group controlId="solution">
                  <Form.Label>Solution</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={solution}
                    placeholder="Enter the solution"
                    rows={4}
                    onChange={(e) => setSolution(e.target.value)}
                  />
                </Form.Group>
                {loading && <Loading size={50} />}
                <Button type="submit" variant="primary" className="m-2">
                  Post Solution
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  );
};

export default CreateSolution;
