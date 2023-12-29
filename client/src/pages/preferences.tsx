import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import CurrentUserContext from "./../context/context";

import { Loading } from "../components/general/loading";
import { ErrorView } from "../components/general/errorView";

import { apiRequest } from "../api/request";
import { updatePreferencesRequest } from "../api/apiUser";
import { findAxiosError } from "../api/error";

import "../styling/profile.css";

export const Preferences = () => {
  const { currentUser, authIsLoading, handleLogout } =
    React.useContext(CurrentUserContext);

  const [madeEdit, setMadeEdit] = useState<boolean>(false);

  const [userPreferences, setUserPreferences] = useState({
    sound: "",
    appearance: "",
  });

  useEffect(() => {
    const fetchUserDetails = () => {
      if (!authIsLoading && currentUser?.preferences != null) {
        setUserPreferences({
          sound: currentUser.preferences[0],
          appearance: currentUser.preferences[1],
        });

        const soundElem = document.getElementById(
          currentUser.preferences[0]
        ) as HTMLInputElement;
        const appearanceElem = document.getElementById(
          currentUser.preferences[1]
        ) as HTMLInputElement;
        if (soundElem != null) {
          soundElem.checked = true;
        }
        if (appearanceElem != null) {
          appearanceElem.checked = true;
        }
      }
    };
    fetchUserDetails();
  }, [authIsLoading, currentUser?.preferences]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserPreferences((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    setMadeEdit(true);
  };

  const handleSave = async () => {
    // Save the change
    // Either A. Force Refresh, B. setMadeEdit(false)
    // I like A because it gives the user feedback that an action has been taken
    // THough for B could just send a notification that update was made
    let res = await apiRequest(() =>
      updatePreferencesRequest(Object.values(userPreferences))
    );
    // On success
    if (res.status === 200) {
      toast.success("Preferences saved!", {
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setMadeEdit(false);
    }
    // On failure
    else {
      if (findAxiosError(res) === 403) {
        toast.error("Failed to save preferences... (Please login!)", {
          autoClose: 3000,
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else {
        toast.error("Failed to save preferences... (Server error :/)", {
          autoClose: 3000,
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    }
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
          <div className="preference-item" onChange={handleChange}>
            <label className="preference-item-title">Guitar Sound</label>
            <label className="radio-inline">
              <input
                id="Acoustic"
                type="radio"
                value="Acoustic"
                name="sound"
                className="settings-radio"
              />{" "}
              Acoustic
            </label>
            <label className="radio-inline">
              <input
                id="Piano"
                type="radio"
                value="Piano"
                name="sound"
                className="settings-radio"
              />{" "}
              Piano
            </label>
            <label className="radio-inline">
              <input
                id="Organ"
                type="radio"
                value="Organ"
                name="sound"
                className="settings-radio"
              />{" "}
              Organ
            </label>
            <label className="radio-inline">
              <input
                id="EDM"
                type="radio"
                value="EDM"
                name="sound"
                className="settings-radio"
              />{" "}
              EDM
            </label>
          </div>
          <div className="preference-item mt-3" onChange={handleChange}>
            <label className="preference-item-title">Guitar Appearance</label>
            <label className="radio-inline">
              <input
                id="Classic"
                type="radio"
                value="Classic"
                name="appearance"
                className="settings-radio"
              />{" "}
              Classic
            </label>
            <label className="radio-inline">
              <input
                id="Light"
                type="radio"
                value="Light"
                name="appearance"
                className="settings-radio"
              />{" "}
              Light
            </label>
            <label className="radio-inline">
              <input
                id="Fancy"
                type="radio"
                value="Fancy"
                name="appearance"
                className="settings-radio"
              />{" "}
              Fancy
            </label>
          </div>
          {madeEdit && (
            <div className="flex-container center p-0">
              <div
                className="chordless-btn edit-chords mt-4"
                onClick={handleSave}
              >
                <div className="song-options-save">
                  {" "}
                  <i className="fa-solid fa-floppy-disk fa-lg"></i> Save Changes
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
};
