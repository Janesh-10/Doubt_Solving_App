import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { login } from "../actions/teacherActions";

const Teacherlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const teacherLogin = useSelector((state) => state.teacherLogin);
  const { loading, error, teacherInfo } = teacherLogin;

  const navigate = useNavigate();

  useEffect(() => {
    if (teacherInfo) {
      navigate("/teacherdoubts");
    }
  }, [navigate, teacherInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const resetHandler = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <div>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        <h1>TEACHER LOGIN</h1>
        <Card>
          <Card.Header>Teacher Login</Card.Header>
          <Card.Body>
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                LOGIN
              </Button>
              <Button className="mx-2" onClick={resetHandler} variant="danger">
                Reset Feilds
              </Button>
              <p>
                Don't have an Account{" "}
                <Link to="/teacherregister">Register</Link> here
              </p>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Teacherlogin;
