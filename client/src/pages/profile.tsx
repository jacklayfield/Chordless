import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import CurrentUserContext from "./../context/context";

import { ErrorView } from "../components/general/errorView";

import { apiRequest } from "../api/request";
import { updateBioRequest, updateNameRequest } from "../api/apiUser";
import { Loading } from "../components/general/loading";

import defaultImg from "../images/defaultProfile.png";
import "../styling/profile.css";

export const Profile = () => {
  const { currentUser, authIsLoading, handleLogout } =
    React.useContext(CurrentUserContext);
  const [editName, setEditName] = useState<boolean>(false);
  const [editBio, setEditBio] = useState<boolean>(false);
  const [bio, setBio] = useState<string>("Tell us about yourself!");
  const [name, setName] = useState<string>("Add your preffered name");

  useEffect(() => {
    const fetchUserDetails = () => {
      if (
        !authIsLoading &&
        currentUser?.name != null &&
        currentUser?.bio != null
      ) {
        setName(currentUser.name);
        setBio(currentUser.bio);
      }
    };
    fetchUserDetails();
  }, [authIsLoading, currentUser?.name, currentUser?.bio]);

  const handleUpdateBio = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let res = await apiRequest(() => updateBioRequest(bio));
    if (res.status === 200) {
      setBio(bio);
      toast.success("Profile updated!", {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      handleLogout();
    }
    setEditBio(false);
  };

  const handleUpdateName = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let res = await apiRequest(() => updateNameRequest(name));
    if (res.status === 200) {
      setName(name);
      toast.success("Profile updated!", {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      handleLogout();
    }
    setEditName(false);
  };

  if (authIsLoading) {
    return <Loading />;
  } else if (currentUser?.username == null) {
    return <ErrorView errType={403} />;
  } else {
    return (
      <>
        <ToastContainer autoClose={2000} />
        <div className="inner-div">
          <img className="profile-img" src={defaultImg} alt="" /> <br />
          <br />
          <h2 className="profile-titles">Username</h2>{" "}
          <div className="profile-vals">{currentUser?.username}</div>
          <br />
          <h2 className="profile-titles">Full name</h2>{" "}
          {editName ? (
            <div className="profile-vals">
              <form onSubmit={handleUpdateName}>
                <input
                  type="text"
                  id="name"
                  defaultValue={name !== "Add your preffered name" ? name : ""}
                  placeholder="Type your name here!"
                  onChange={(event) => setName(event.target.value)}
                />
                <button
                  type="submit"
                  className="btn btn-success btn-default pull-left"
                >
                  <span className="glyphicon glyphicon-off"></span> Save Changes
                </button>
              </form>
            </div>
          ) : (
            <div className="profile-vals">
              {<span>{name} </span>}
              <button onClick={() => setEditName(true)} className="edit-button">
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
            </div>
          )}
          <br />
          <h2 className="profile-titles">Email</h2>{" "}
          <div className="profile-vals">{currentUser?.email}</div>
          <br />
          <h2 className="profile-titles">Bio</h2>
          {editBio ? (
            <div className="profile-vals">
              <form onSubmit={handleUpdateBio}>
                <input
                  type="text"
                  id="bio"
                  defaultValue={bio !== "Tell us about yourself!" ? bio : ""}
                  placeholder="Type bio here!"
                  onChange={(event) => setBio(event.target.value)}
                />
                <button
                  type="submit"
                  className="btn btn-success btn-default pull-left"
                >
                  <span className="glyphicon glyphicon-off"></span> Save Changes
                </button>
              </form>
            </div>
          ) : (
            <div className="profile-vals">
              {<span>{bio} </span>}
              <button onClick={() => setEditBio(true)} className="edit-button">
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
            </div>
          )}
        </div>
      </>
    );
  }
};
