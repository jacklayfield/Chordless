import React, { useEffect, useState } from "react";
import CurrentUserContext from "../context/context";
import { SongCard } from "../components/songCard";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { Songs } from "../components/songs";

//THIS PAGE FOR TESTING PURPOSES ONLY AS OF RIGHT NOW

export type SONG_TYPE = {
  songName: String;
  songId: number;
};

export const MySongs = () => {
  const { currentUser, authIsLoading } = React.useContext(CurrentUserContext);

  // Creating type now as other elements will be added

  const [songs, setSongs] = useState<SONG_TYPE[]>([]);
  const [loadingSongs, setLoadingSongs] = useState<boolean>(true);

  useEffect(() => {
    const fetchSongs = async () => {
      setLoadingSongs(true);
      if (!authIsLoading) {
        try {
          const res = await axios.get("/api/songs/userSongs");
          console.log(res);

          let dbSongs: SONG_TYPE[] = [];

          for (let i = 0; i < res.data.length; i++) {
            let song: SONG_TYPE = {
              songName: res.data[i].name,
              songId: res.data[i].id,
            };
            dbSongs.push(song);
          }
          setSongs(dbSongs);
        } catch (error) {
          console.error(error);
        }
        setLoadingSongs(false);
      }
    };
    fetchSongs();
  }, [authIsLoading]);

  let half: number, half1: SONG_TYPE[], half2: SONG_TYPE[];

  const splitSongs = () => {
    half = Math.ceil(songs.length / 2);
    half1 = songs.slice(0, half);
    half2 = songs.slice(half, songs.length);
  };

  const content = () => {
    if (authIsLoading || loadingSongs) {
      return <div>Loading...</div>;
    } else if (!currentUser) {
      return <div>no user</div>;
    } else {
      splitSongs();
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
                    {currentUser.id !== undefined ? (
                      <div>
                        Hey there {currentUser.username}! Here are your songs:{" "}
                        {songs.length === 0 && (
                          <div className="chords">
                            No songs 😢 Click "Create Song" in the top
                            navigation bar to make your first song!
                          </div>
                        )}
                        <Row>
                          <Col>
                            <Songs songs={half1} />
                          </Col>
                          <Col>
                            <Songs songs={half2} />
                          </Col>
                        </Row>
                      </div>
                    ) : (
                      <div>
                        It appears you are not signed in! Please tap "Login" in
                        the top right or{" "}
                        <a href="http://localhost:3000/createAccount">
                          click here
                        </a>{" "}
                        to make an account (It's easy).
                      </div>
                    )}
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
