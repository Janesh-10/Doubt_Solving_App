import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { listPosts } from "../actions/postActions";
import { useNavigate, useParams } from "react-router-dom";
import formatDistance from "date-fns/formatDistance";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

const PostSolution = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const postList = useSelector((state) => state.postList);
  const { loading, error, posts } = postList;

  const teacherLogin = useSelector((state) => state.teacherLogin);
  const { teacherInfo } = teacherLogin;

  const solutionCreate = useSelector((state) => state.solutionCreate);
  const { success } = solutionCreate;

  useEffect(() => {
    dispatch(listPosts(id));
    if (!teacherInfo) {
      navigate("/");
    }
  }, [dispatch, navigate, teacherInfo, id, success]);

  return (
    <div>
      <Container>
        <Row>
          <h1>Welcome to Posts Page</h1>
        </Row>
        <Row className="m-2">
          <Button
            variant="success"
            href={`createsolution/${id}`}
            style={{ width: "200px" }}
          >
            Post new solution
          </Button>
        </Row>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        {posts?.map((post) => (
          <Row className="m-2" key={post._id}>
            <Card>
              <Card.Header as="h5">
                {post.creator_email === teacherInfo.email
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

export default PostSolution;
