import CurrentUserContext from "./../context/context";
import React, { useEffect, useState } from "react";
import "../styling/profile.css";
import { Loading } from "../components/general/loading";
import { ErrorView } from "../components/general/errorView";
import { toast, ToastContainer } from "react-toastify";

export const Preferences = () => {
  const { currentUser, authIsLoading, handleLogout } =
    React.useContext(CurrentUserContext);

  useEffect(() => {
    const fetchUserDetails = () => {
      
    };
    fetchUserDetails();
  }, [authIsLoading]);



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

          
        </div>
      </>
    );
  }
};
