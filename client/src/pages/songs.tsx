import React, { useEffect, useState } from "react";
import CurrentUserContext from "./../context/context";
import { SongCard } from "../components/songCard";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

//THIS PAGE FOR TESTING PURPOSES ONLY AS OF RIGHT NOW

export const Songs = () => {
  const { currentUser, authIsLoading, handleLogout } =
    React.useContext(CurrentUserContext);

  // Creating type now as other elements will be added
  type SONG_TYPE = {
    songName: String;
  };

  const [songs, setSongs] = useState<SONG_TYPE[]>([]);
  const [userLoaded, setUserLoaded] = useState<boolean>(false);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await axios.get("/api/songs/userSongs");
        console.log(res);

        let dbSongs: SONG_TYPE[] = [];

        for (let i = 0; i < res.data.length; i++) {
          let song: SONG_TYPE = {
            songName: res.data[i].name,
          };
          dbSongs.push(song);
        }

        setSongs(dbSongs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSongs();
  }, []);

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
                        {songs.map((song, i) => {
                          return (
                            <div className="chords mb-4" key={i}>
                              {song.songName}
                            </div>
                          );
                        })}
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
