import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { listPosts } from "../actions/postActions";
import formatDistance from "date-fns/formatDistance";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import axios from "axios";
import {
  updateDoubtSolveAction,
  updateDoubtUnsolveAction,
} from "../actions/doubtActions";

const PostQueries = () => {
  const [status, setStatus] = useState("");

  const [errormes, setErrorMes] = useState(null);

  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const postList = useSelector((state) => state.postList);
  const { loading, error, posts } = postList;

  const studentLogin = useSelector((state) => state.studentLogin);
  const { userInfo } = studentLogin;

  const queryCreate = useSelector((state) => state.queryCreate);
  const { success } = queryCreate;

  const onSolve = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(updateDoubtSolveAction(id));
      setErrorMes(null);
      navigate("/mydoubts");
    } else setErrorMes("An Error occured");
  };

  const onUnsolve = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(updateDoubtUnsolveAction(id));
      setErrorMes(null);
      navigate("/mydoubts");
    } else setErrorMes("An Error occured");
  };

  useEffect(() => {
    dispatch(listPosts(id));
    const fetching = async () => {
      const { data } = await axios.get(`/api/doubts/${id}`);

      setStatus(data.solution_status);
    };
    fetching();
    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, navigate, userInfo, id, success]);

  return (
    <div>
      <Container>
        <Row>
          <h1>Welcome to Posts Page</h1>
        </Row>
        <Row className="m-2">
          <Col>
            <Button
              variant="success"
              href={`createquery/${id}`}
              style={{ width: "200px" }}
            >
              Post new Query
            </Button>
          </Col>
          <Col>
            {status === "unsolved" ? (
              <Button
                variant="primary"
                style={{ width: "200px" }}
                onClick={() => onSolve(id)}
              >
                Mark as Solved
              </Button>
            ) : (
              <Button
                variant="danger"
                style={{ width: "200px" }}
                onClick={() => onUnsolve(id)}
              >
                Mark as Unsolved
              </Button>
            )}
            {errormes && (
              <ErrorMessage variant="danger">{errormes}</ErrorMessage>
            )}
          </Col>
        </Row>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        {posts?.map((post) => (
          <Row className="m-2" key={post._id}>
            <Card>
              <Card.Header as="h5">
                {post.creator_email === userInfo.email
                  ? "Me"
                  : post.creator_email}
              </Card.Header>
              <Card.Body>
                <Card.Text>{post.solution}</Card.Text>
              </Card.Body>
              <Card.Footer>
                {formatDistance(new Date(post.createdAt), new Date())}
              </Card.Footer>
            </Card>
          </Row>
        ))}
      </Container>
    </div>
  );
};

export default PostQueries;
