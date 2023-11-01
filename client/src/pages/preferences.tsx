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

  useEffect(() => {
    const fetchUserDetails = () => {
      if (!authIsLoading && currentUser?.preferences != null) {
        setUserPreferences(currentUser.preferences);
      }
    };
    fetchUserDetails();
  }, [authIsLoading, currentUser?.preferences]);

  if (authIsLoading) {
    return <Loading />;
  } else if (currentUser?.username == null) {
    return <ErrorView errType={403} />;
  } else {
    return (
      <>
        <ToastContainer autoClose={2000} />
        <div className="inner-div">
          {/**sections:
           * Dark/Light mode
           * guitar color / type
           * guitar sound
           *
           */}

          {userPreferences}

          <div className="preference-item">
            <label className="preference-item-title">Guitar Sound</label>
            <label className="radio-inline">
              <input
                type="radio"
                value="Acoustic"
                name="sound"
                className="settings-radio"
              />{" "}
              Acoustic
            </label>
            <label className="radio-inline">
              <input
                type="radio"
                value="Piano"
                name="sound"
                className="settings-radio"
              />{" "}
              Piano
            </label>
            <label className="radio-inline">
              <input
                type="radio"
                value="Organ"
                name="sound"
                className="settings-radio"
              />{" "}
              Organ
            </label>
            <label className="radio-inline">
              <input
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
                type="radio"
                value="Classic"
                name="appearance"
                className="settings-radio"
              />{" "}
              Classic
            </label>
            <label className="radio-inline">
              <input
                type="radio"
                value="Light"
                name="appearance"
                className="settings-radio"
              />{" "}
              Light
            </label>
            <label className="radio-inline">
              <input
                type="radio"
                value="Fancy"
                name="appearance"
                className="settings-radio"
              />{" "}
              Fancy
            </label>
          </div>
        </div>
      </>
    );
  }
};
