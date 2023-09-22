import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDoubtAction } from "../actions/doubtActions";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const CreateDoubt = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const doubtCreate = useSelector((state) => state.doubtCreate);
  const { loading, error, doubt } = doubtCreate;

  const resetHandler = () => {
    setTitle("");
    setDescription("");
    setSubject("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createDoubtAction(title, description, subject));
    if (!title || !description || !subject) return;

    resetHandler();
    navigate("/mydoubts");
  };

  const onValueChange = (event) => {
    setSubject(event.target.value);
  };

  useEffect(() => {}, []);

  return (
    <div>
      <h1>Create a new Doubt</h1>
      <Card>
        <Card.Header>Create a new Doubt</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={description}
                placeholder="Enter the description"
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="subject">
              <div>Subject</div>
              <div className="mb-3">
                <Form.Check
                  inline
                  label="Data Science and Analytics"
                  name="subject"
                  type="radio"
                  id="Data Science and Analytics"
                  value="Data Science and Analytics"
                  checked={subject === "Data Science and Analytics"}
                  onChange={onValueChange}
                />
                <Form.Check
                  inline
                  label="Internet of Things"
                  name="subject"
                  type="radio"
                  id="Internet of Things"
                  value="Internet of Things"
                  checked={subject === "Internet of Things"}
                  onChange={onValueChange}
                />
                <Form.Check
                  inline
                  label="Advance Computing"
                  name="subject"
                  type="radio"
                  id="Advance Computing"
                  value="Advance Computing"
                  checked={subject === "Advance Computing"}
                  onChange={onValueChange}
                />
                <Form.Check
                  inline
                  label="Compiler Design"
                  name="subject"
                  type="radio"
                  id="Compiler Design"
                  value="Compiler Design"
                  checked={subject === "Compiler Design"}
                  onChange={onValueChange}
                />
                <Form.Check
                  inline
                  label="Blockchain Technology"
                  name="subject"
                  type="radio"
                  id="Blockchain Technology"
                  value="Blockchain Technology"
                  checked={subject === "Blockchain Technology"}
                  onChange={onValueChange}
                />
              </div>
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Create Note
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default CreateDoubt;
