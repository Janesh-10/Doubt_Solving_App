import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/teacherActions";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";

const Teacherregister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);

  const fileRef = useRef(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const teacherRegister = useSelector((state) => state.teacherRegister);
  const { loading, error, teacherInfo } = teacherRegister;

  useEffect(() => {
    if (teacherInfo) {
      navigate("/teacherdoubts");
    }
  }, [navigate, teacherInfo]);

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
    setSubjects([]);
    setCheckedState(new Array(subjectList.length).fill(false));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password.length < 5) {
      setMessage("Password should have atleast 5 characters");
    } else if (password !== confirmPassword) {
      setMessage("Password and Confirm-Password do not Match");
    } else {
      setMessage(null);
      dispatch(register(name, email, password, pic, subjects));
    }
  };

  return (
    <div>
      <h1>TEACHER REGISTRATION</h1>
      {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
      {message && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      <Card>
        <Card.Header>Teacher Registration</Card.Header>
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
            <Button variant="primary" type="submit">
              REGISTER
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
            <p>
              Already have an Account <Link to="/teacherlogin">Login</Link> here
            </p>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Teacherregister;
