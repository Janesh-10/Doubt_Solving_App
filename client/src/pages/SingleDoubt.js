import React, { useEffect, useState } from "react";
import axios from "axios";
import { deleteDoubtAction, updateDoubtAction } from "../actions/doubtActions";
import { useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { Button, Card, Form } from "react-bootstrap";

const SingleDoubt = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");

  const { id } = useParams();

  const dispatch = useDispatch();

  const doubtUpdate = useSelector((state) => state.doubtUpdate);
  const { loading, error } = doubtUpdate;

  const doubtDelete = useSelector((state) => state.doubtDelete);
  const { loading: loadingDelete, error: errorDelete } = doubtDelete;

  const navigate = useNavigate();

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateDoubtAction(id, title, description, subject));
    if (!title || !description || !subject) return;

    resetHandler();
    navigate("/mydoubts");
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteDoubtAction(id));
    }
    navigate("/mydoubts");
  };

  const onValueChange = (event) => {
    setSubject(event.target.value);
  };

  const resetHandler = () => {
    setTitle("");
    setDescription("");
    setSubject("");
  };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/doubts/${id}`);

      setTitle(data.title);
      setDescription(data.description);
      setSubject(data.subject);
      setDate(data.updatedAt);
    };
    fetching();
  }, [id, date]);

  return (
    <div>
      <h1>Edit your Doubt</h1>
      <Card>
        <Card.Header>Edit your Doubt</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the description"
                rows={4}
                value={description}
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
            <Button variant="primary" type="submit">
              Update Doubt
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              onClick={() => deleteHandler(id)}
            >
              Delete Doubt
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default SingleDoubt;
