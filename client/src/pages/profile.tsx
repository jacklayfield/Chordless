import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import defaultImg from "../images/defaultProfile.png";
import CurrentUserContext from "./../context/context";
import React, { useState } from "react";
import "../styling/profile.css";
import { apiRequest } from "../api/request";
import { updateBioRequest, updateNameRequest } from "../api/apiUser";
import { Loading } from "../components/general/loading";
import { ErrorView } from "../components/general/errorView";

export const Profile = () => {
  const { currentUser, authIsLoading } = React.useContext(CurrentUserContext);
  const [editName, setEditName] = useState<boolean>(false);
  const [editBio, setEditBio] = useState<boolean>(false);
  const [bio, setBio] = useState<string>("");
  const [name, setName] = useState<string>("");

  const handleUpdateBio = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log("before " + bio);
    let res = await apiRequest(() => updateBioRequest(bio));
    console.log("after " + bio);
    //setEditBio(false);
  };

  const handleUpdateName = async (event: React.FormEvent<HTMLFormElement>) => {
    let res = await apiRequest(() => updateNameRequest(name));
    setEditName(false);
  };

  if (authIsLoading) {
    return <Loading />;
  } else if (currentUser?.username === undefined) {
    return <ErrorView errType={403} />;
  } else {
    return (
      <div>
        <div className="inner-div">
          <img className="profile-img" src={defaultImg} alt="" /> <br />
          <br />
          <h2 className="profile-titles">Username</h2>{" "}
          <div className="profile-vals">{currentUser?.username}</div>
          <br />
          <h2 className="profile-titles">Full name</h2>{" "}
          <div>
            {editName ? (
              <div className="profile-vals">
                <form onSubmit={handleUpdateName}>
                  {currentUser?.name !== "null" &&
                    currentUser?.name !== null && (
                      <input
                        type="text"
                        id="title"
                        defaultValue={currentUser?.name}
                        onChange={(event) => setName(event.target.value)}
                      />
                    )}
                  {currentUser?.name === "null" && (
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
                {currentUser?.name !== "null" && (
                  <span>{currentUser?.name} </span>
                )}
                {currentUser?.name === "null" && <span>Not provided</span>}{" "}
                <button
                  onClick={() => setEditName(true)}
                  className="edit-button"
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
              </div>
            )}
          </div>
          <br />
          <h2 className="profile-titles">Email</h2>{" "}
          <div className="profile-vals">{currentUser?.email}</div>
          <br />
          <h2 className="profile-titles">Bio</h2>
          <div className="profile-vals">
            {" "}
            {editBio ? (
              <div>
                <form onSubmit={handleUpdateBio}>
                  {currentUser?.bio !== "null" && currentUser?.bio !== null && (
                    <input
                      type="text"
                      id="title"
                      defaultValue={currentUser?.bio}
                      onChange={(event) => setBio(event.target.value)}
                    />
                  )}
                  {currentUser?.bio === "null" && (
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
                {currentUser?.bio !== "null" && (
                  <span>{currentUser?.bio} </span>
                )}
                {currentUser?.bio === "null" && (
                  <span>Tell us about yourself!</span>
                )}{" "}
                <button
                  onClick={() => setEditBio(true)}
                  className="edit-button"
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
};
