import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import "./ProfileScreen.css";
import { updateProfile } from "../actions/teacherActions";

const TeacherProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState();
  const [message, setMessage] = useState(null);
  const [subjects, setSubjects] = useState([]);

  const dispatch = useDispatch();

  const teacherLogin = useSelector((state) => state.teacherLogin);
  const { teacherInfo } = teacherLogin;

  const teacherUpdate = useSelector((state) => state.teacherUpdate);
  const { loading, error, success } = teacherUpdate;

  const navigate = useNavigate();

  const subjectList = [
    "Data Science and Analytics",
    "Internet of Things",
    "Advance Computing",
    "Compiler Design",
    "Blockchain Technology",
  ];

  const [checkedState, setCheckedState] = useState(
    new Array(subjectList.length).fill(false)
  );

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    const editSubjects = [];
    for (let i = 0; i < subjectList.length; i++) {
      if (updatedCheckedState[i]) {
        editSubjects.push(subjectList[i]);
      }
    }
    setSubjects(editSubjects);
  };

  useEffect(() => {
    if (!teacherInfo) {
      navigate("/");
    } else {
      setName(teacherInfo.name);
      setEmail(teacherInfo.email);
      setPic(teacherInfo.pic);
      setSubjects(teacherInfo.subjects);
    }
  }, [navigate, teacherInfo]);

  const postDetails = (pics) => {
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
          console.log(pic);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password.length < 5) {
      setMessage("Password should have atleast 5 characters");
    } else if (password !== confirmPassword) {
      setMessage("Password and Confirm-Password do not Match");
    } else {
      setMessage(null);
      dispatch(updateProfile({ name, email, password, pic, subjects }));
    }
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <div>
        <Row>
          <Col md={6}>
            <Card>
              <Card.Header>Edit Profile</Card.Header>
              <Card.Body>
                <Form onSubmit={submitHandler}>
                  {loading && <Loading />}
                  {success && (
                    <ErrorMessage variant="success">
                      Updated Successfully
                    </ErrorMessage>
                  )}
                  {error && (
                    <ErrorMessage variant="danger">{error}</ErrorMessage>
                  )}
                  {message && (
                    <ErrorMessage variant="danger">{message}</ErrorMessage>
                  )}
                  <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  {picMessage && (
                    <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                  )}
                  <Form.Group controlId="pic" className="mb-3">
                    <Form.Label>Change Profile Picture</Form.Label>
                    <Form.Control
                      onChange={(e) => postDetails(e.target.files[0])}
                      type="file"
                    />
                  </Form.Group>

                  <Form.Group controlId="subjects">
                    <div>Subjects</div>
                    <div className="mb-3">
                      {subjectList.map((subject, index) => {
                        return (
                          <Form.Check
                            inline
                            key={index}
                            type="checkbox"
                            id={subject}
                            label={subject}
                            name={subject}
                            value={subject}
                            checked={checkedState[index]}
                            onChange={() => handleOnChange(index)}
                          />
                        );
                      })}
                    </div>
                  </Form.Group>
                  <Button type="submit" varient="primary">
                    Update
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={pic} alt={name} className="profilePic" />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TeacherProfile;
