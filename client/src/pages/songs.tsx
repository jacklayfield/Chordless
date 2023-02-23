import React from "react";
import CurrentUserContext from "./../context/context";
import { SongCard } from "../components/songCard";
import { Row, Col } from "react-bootstrap";

//THIS PAGE FOR TESTING PURPOSES ONLY AS OF RIGHT NOW

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
          <Row className="gx-0">
            <Col />
            <Col xs={8}>
              <div className="columns">
                <div className="sectionTitles">
                  <header className="sectionTitlesText">My Songs</header>
                </div>

                <div style={{ padding: 20 }}>
                  <div
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    <Row>
                      <Col>
                        <SongCard />
                      </Col>
                      <Col>
                        <SongCard />
                      </Col>
                    </Row>
                    <a onClick={handleLogout}>Logout</a>
                    <div>Welcome, {currentUser.email}</div>
                  </div>
                </div>
              </div>
            </Col>
            <Col />
          </Row>
        </div>
      );
    }
  };
  return <div>{content()}</div>;
};
