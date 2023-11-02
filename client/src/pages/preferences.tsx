import CurrentUserContext from "./../context/context";
import React, { useEffect, useState } from "react";
import "../styling/profile.css";
import { Loading } from "../components/general/loading";
import { ErrorView } from "../components/general/errorView";
import { toast, ToastContainer } from "react-toastify";

export const Preferences = () => {
  const { currentUser, authIsLoading, handleLogout } =
    React.useContext(CurrentUserContext);
  const [userPreferences, setUserPreferences] = useState<string[]>([]);
  const [madeEdit, setMadeEdit] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserDetails = () => {
      if (!authIsLoading && currentUser?.preferences != null) {
        setUserPreferences(currentUser.preferences);

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
    console.log(event.target.value);
    setMadeEdit(true);
  };

  const handleSave = () => {
    // Save the change
    // Either A. Force Refresh, B. setMadeEdit(false)
    // I like A because it gives the user feedback that an action has been taken
    // THough for B could just send a notification that update was made
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
          <div className="preference-item mt-3">
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
              <div className="chordless-btn edit-chords mt-4">
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
