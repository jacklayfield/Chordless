import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import logo from "./../logo.png";
import text from "../text.png";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../styling/navbar.css";
import React, { useState } from "react";
import CurrentUserContext from "./../context/context";

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
            {/* {currentUser?.username == null && !authIsLoading && (
              <Nav.Link className="sign-in" eventKey={2} href="/login">
                <i style={{ color: "gray" }} className="fa-solid fa-user"></i>
                <> </> Login
              </Nav.Link>
            )}
            {authIsLoading && localStorage.getItem("username") == undefined && (
              <Nav.Link className="sign-in" eventKey={2} href="/login">
                <i style={{ color: "gray" }} className="fa-solid fa-user"></i>
                <> </> {localStorage.getItem("username")}
              </Nav.Link>
            )}
            {currentUser?.username != null && (
              <Nav.Link className="sign-in" eventKey={2} href="/login">
                <i style={{ color: "gray" }} className="fa-solid fa-user"></i>
                <> </> {currentUser.username}
              </Nav.Link>
            )} */}
            {localStorage.getItem("username") != "undefined" && (
              <Nav.Link className="sign-in" eventKey={2} href="/login">
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title={localStorage.getItem("username")}
                  menuVariant="dark"
                >
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav.Link>
            )}

            {localStorage.getItem("username") == "undefined" && (
              <Nav.Link className="sign-in" eventKey={2} href="/login">
                <i style={{ color: "gray" }} className="fa-solid fa-user"></i>
                <> </> Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
