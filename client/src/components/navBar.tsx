import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import logo from "../logo.png";
import text from "../text.png";

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
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              style={{ paddingLeft: 30, fontSize: 20, fontWeight: 500 }}
              href="/createSong"
            >
              Create Song
            </Nav.Link>
            <Nav.Link
              style={{ paddingLeft: 30, fontSize: 20, fontWeight: 500 }}
              href="/mySongs"
            >
              My Songs
            </Nav.Link>
            <Nav.Link
              style={{ paddingLeft: 30, fontSize: 20, fontWeight: 500 }}
              href="/about"
            >
              About
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link style={{ paddingRight: 30 }} eventKey={2} href="/login">
              <i style={{ color: "gray" }} className="fa-solid fa-user"></i>
              <> </> Sign In
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
