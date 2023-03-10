import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import logo from "./../logo.png";
import text from "../text.png";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../styling/navbar.css";
import React, { useState } from "react";
import CurrentUserContext from "./../context/context";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Containter from "react-bootstrap/Container";

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
            {localStorage.getItem("username") != "undefined" && (
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
                <NavDropdown.Item href="#action/3.3">
                  <i
                    style={{ color: "gray", paddingRight: "10px" }}
                    className="fa-solid fa-gear"
                  ></i>
                  Preferences
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} href="#action/3.4">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}

            {localStorage.getItem("username") == "undefined" && (
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
