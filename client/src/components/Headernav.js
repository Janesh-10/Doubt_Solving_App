import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/studentActions";
import { logout as teacherlogout } from "../actions/teacherActions";

function Headernav() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const studentLogin = useSelector((state) => state.studentLogin);
  const { userInfo } = studentLogin;

  const teacherLogin = useSelector((state) => state.teacherLogin);
  const { teacherInfo } = teacherLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  const teacherlogoutHandler = () => {
    dispatch(teacherlogout());
    navigate("/");
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Navbar.Brand>Doubt Solver</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {userInfo ? (
            <Nav className="me-auto">
              <Nav.Link href="/mydoubts">My Doubts</Nav.Link>
              <NavDropdown title={userInfo?.name} id="basic-nav-dropdown">
                <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <div></div>
          )}
          {teacherInfo ? (
            <Nav className="me-auto">
              <Nav.Link href="/teacherdoubts">My Doubts</Nav.Link>
              <NavDropdown title={teacherInfo?.name} id="basic-nav-dropdown">
                <NavDropdown.Item href="#">My Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={teacherlogoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <div></div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Headernav;
