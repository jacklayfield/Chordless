import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import logo from "../logo.png";
import text from "../text.png";
import "../styling/navbar.css";

export const NavBar = () => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      sticky="top"
      style={{ backgroundColor: "#FF914E" }}
    >
      <Container>
        <Navbar.Brand>
          <a href="/">
            <img
              alt=""
              src={logo}
              width="50"
              height="50"
              className="d-inline-block align-top"
            />
            <img
              alt=""
              src={text}
              width="100"
              height="55"
              className="d-inline-block align-top"
            />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="nav-link" href="/createSong">
              Create Song
            </Nav.Link>
            <Nav.Link className="nav-link" href="/mySongs">
              My Songs
            </Nav.Link>
            <Nav.Link className="nav-link" href="/about">
              About
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link className="sign-in" eventKey={2} href="/login">
              <i style={{ color: "gray" }} className="fa-solid fa-user"></i>
              <> </> Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
