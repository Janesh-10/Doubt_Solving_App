import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/studentActions";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";

const Studentregister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);

  const fileRef = useRef(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const studentRegister = useSelector((state) => state.studentRegister);
  const { loading, error, userInfo } = studentRegister;

  useEffect(() => {
    if (userInfo) {
      navigate("/mydoubts");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password.length < 5) {
      setMessage("Password should have atleast 5 characters");
    } else if (password !== confirmPassword) {
      setMessage("Password and Confirm-Password do not Match");
    } else {
      setMessage(null);
      dispatch(register(name, email, password, pic));
    }
  };

  const postDetails = (pics) => {
    if (
      pics ===
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    ) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "doubtsolvingapp");
      data.append("cloud_name", "dxmhdmob0");
      fetch("https://api.cloudinary.com/v1_1/dxmhdmob0/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image of type jpg or png");
    }
  };

  const resetHandler = () => {
    setEmail("");
    setName("");
    setPic(
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    );
    setPassword("");
    setConfirmPassword("");
    fileRef.current.value = null;
  };

  return (
    <div>
      <h1>STUDENT REGISTRATION</h1>
      {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
      {message && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      <Card>
        <Card.Header>Student Registration</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
              />
            </Form.Group>

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

            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
              />
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="pic">
          <Form.Label>Profile Picture</Form.Label>
          <Form.File
            id="custom-file"
            type="image/png"
            label="Upload Profile Picture"
            custom
          />
        </Form.Group> */}
            {picMessage && (
              <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
            )}
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                ref={fileRef}
                type="file"
                onChange={(e) => postDetails(e.target.files[0])}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              REGISTER
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
            <p>
              Already have an Account <Link to="/studentlogin">Login</Link> here
            </p>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Studentregister;
