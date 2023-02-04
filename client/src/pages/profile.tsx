import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import defaultImg from "../defaultProfile.png";
import "../styling/profile.css";
import CurrentUserContext from "./../context/context";
import React, { useState } from "react";
import axios from "axios";

export const Profile = () => {
  const { currentUser, authIsLoading } = React.useContext(CurrentUserContext);
  const [editName, setEditName] = useState<boolean>(false);
  const [editBio, setEditBio] = useState<boolean>(false);
  const [bio, setBio] = useState<string>("");
  const [name, setName] = useState<string>("");

  const handleUpdateBio = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      const res = await axios.put("/api/users/updateBio", {
        data: { bio },
      });
    } catch (error) {
      console.error(error);
    }
    setEditBio(false);
  };

  const handleUpdateName = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      const res = await axios.put("/api/users/updateName", {
        data: { name },
      });
    } catch (error) {
      console.error(error);
    }
    setEditName(false);
  };

  return (
    <div>
      <Row className="gx-0">
        <Col />
        <Col xs={8}>
          <div className="columns">
            <div className="sectionTitles">
              <header className="sectionTitlesText">Profile</header>
            </div>

            <div style={{ padding: 20 }}>
              <div
                style={{
                  fontSize: "20px",
                }}
              >
                <img className="profile-img" src={defaultImg} alt="" /> <br />
                <br />
                <h2 style={{ textAlign: "center" }}>Username</h2>{" "}
                <div className="profile-vals">{currentUser?.username}</div>
                <br />
                <h2 style={{ textAlign: "center" }}>Full name</h2>{" "}
                <div>
                  {editName ? (
                    <div className="profile-vals">
                      <form onSubmit={handleUpdateName}>
                        {currentUser?.name != "null" &&
                          currentUser?.name != null && (
                            <input
                              type="text"
                              id="title"
                              defaultValue={currentUser?.name}
                              onChange={(event) => setName(event.target.value)}
                            />
                          )}
                        {currentUser?.name == "null" && (
                          <input
                            type="text"
                            id="title"
                            defaultValue="Type your full name here"
                            onChange={(event) => setName(event.target.value)}
                          />
                        )}{" "}
                        <button
                          type="submit"
                          className="btn btn-success btn-default pull-left"
                        >
                          <span className="glyphicon glyphicon-off"></span> Save
                          Changes
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div className="profile-vals">
                      {currentUser?.name != "null" && (
                        <span>{currentUser?.name} </span>
                      )}
                      {currentUser?.name == "null" && <span>Not provided</span>}{" "}
                      <button
                        onClick={() => setEditName(true)}
                        style={{ border: "0px", background: "white" }}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                    </div>
                  )}
                </div>
                <br />
                <h2 style={{ textAlign: "center" }}>Email</h2>{" "}
                <div className="profile-vals">{currentUser?.email}</div>
                <br />
                <h2 style={{ textAlign: "center" }}>Bio</h2>
                <div className="profile-vals">
                  {" "}
                  {editBio ? (
                    <div>
                      <form onSubmit={handleUpdateBio}>
                        {currentUser?.bio != "null" &&
                          currentUser?.bio != null && (
                            <input
                              type="text"
                              id="title"
                              defaultValue={currentUser?.bio}
                              onChange={(event) => setBio(event.target.value)}
                            />
                          )}
                        {currentUser?.bio == "null" && (
                          <input
                            type="text"
                            id="title"
                            defaultValue="Tell us about yourself!"
                            onChange={(event) => setBio(event.target.value)}
                          />
                        )}{" "}
                        <button
                          type="submit"
                          className="btn btn-success btn-default pull-left"
                        >
                          <span className="glyphicon glyphicon-off"></span> Save
                          Changes
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div>
                      {currentUser?.bio != "null" && (
                        <span>{currentUser?.bio} </span>
                      )}
                      {currentUser?.bio == "null" && (
                        <span>Tell us about yourself!</span>
                      )}{" "}
                      <button
                        onClick={() => setEditBio(true)}
                        style={{ border: "0px", background: "white" }}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col />
      </Row>
    </div>
  );
};
