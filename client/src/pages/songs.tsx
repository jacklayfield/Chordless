import React from "react";
import CurrentUserContext from "./../context/context";

export const Songs = () => {
  const { currentUser, authIsLoading, handleLogout } =
    React.useContext(CurrentUserContext);
  const content = () => {
    if (authIsLoading) {
      return <div>Loading...</div>;
    } else if (!currentUser) {
      return <div>no user</div>;
    } else {
      return (
        <div>
          <a onClick={handleLogout}>Logout</a>
          <div>Welcome, {currentUser.email}</div>
        </div>
      );
    }
  };
  return <div>{content()}</div>;
};
