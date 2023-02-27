import React, { useEffect, useState } from "react";
import CurrentUserContext from "./../context/context";
import { SongCard } from "../components/songCard";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

//THIS PAGE FOR TESTING PURPOSES ONLY AS OF RIGHT NOW

export const Songs = () => {
  const { currentUser, authIsLoading } = React.useContext(CurrentUserContext);

  // Creating type now as other elements will be added
  type SONG_TYPE = {
    songName: String;
  };

  const [songs, setSongs] = useState<SONG_TYPE[]>([]);
  const [loadingSongs, setLoadingSongs] = useState<boolean>(true);

  useEffect(() => {
    const fetchSongs = async () => {
      setLoadingSongs(true);
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
        console.error(error);
      }
      setLoadingSongs(false);
    };
    fetchSongs();
  }, []);

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
                    <Row>
                      <Col>
                        {half1.map((song, i) => {
                          return (
                            <div className="m-3" key={i}>
                              <SongCard songName={song.songName} />
                            </div>
                          );
                        })}
                      </Col>
                      <Col>
                        {half2.map((song, i) => {
                          return (
                            <div className="m-3" key={i}>
                              <SongCard songName={song.songName} />
                            </div>
                          );
                        })}
                      </Col>
                    </Row>
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
