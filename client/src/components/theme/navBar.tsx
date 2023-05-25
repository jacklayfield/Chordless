import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import chordless_logo_transparent from "../../images/chordless_logo_transparent.png";
import NavDropdown from "react-bootstrap/NavDropdown";
import React from "react";
import CurrentUserContext from "../../context/context";
import "../../styling/navbar.css";

export const NavBar = () => {
  const { currentUser, authIsLoading, handleLogout } =
    React.useContext(CurrentUserContext);

  if (!authIsLoading) {
    localStorage.setItem("username", String(currentUser?.username));
  }

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      sticky="top"
      style={{ backgroundColor: "#FF914E" }}
    >
      <Container>
        <Navbar.Brand>
          <a href="/createSong">
            <img
              alt=""
              src={chordless_logo_transparent}
              width="177"
              height="40"
              className="d-inline-block align-top"
            />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="nav-link-text" href="/createSong">
              Create Song
            </Nav.Link>
            <Nav.Link className="nav-link-text" href="/mySongs">
              My Songs
            </Nav.Link>
            <Nav.Link className="nav-link-text" href="/about">
              About
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link className="align-middle" href="#">
              <i
                style={{ color: "gray", justifyContent: "Center" }}
                className="fa-solid fa-user"
              ></i>
            </Nav.Link>
            {localStorage.getItem("username") !== "undefined" && (
              <NavDropdown
                title={localStorage.getItem("username")}
                className="m-0"
              >
                <NavDropdown.Item href="/profile">
                  <i
                    style={{ color: "gray", paddingRight: "10px" }}
                    className="fa-solid fa-user"
                  ></i>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <i
                    style={{ color: "gray", paddingRight: "10px" }}
                    className="fa-solid fa-gear"
                  ></i>
                  Preferences
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}

            {localStorage.getItem("username") === "undefined" && (
              <Nav.Link eventKey={2} href="/login">
                <> </> Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
