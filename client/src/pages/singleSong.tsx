import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { CHORD_TYPE } from "../components/songBuilder";
import { Song } from "../components/song";
import { Row, Col } from "react-bootstrap";
import { useViewport } from "../hooks/useViewport";
import { ViewMenu } from "../components/viewMenu";
import { DeleteConfirmation } from "../components/deleteConfirmation";
import "../styling/theme.css";
import CurrentUserContext from "../context/context";
import React from "react";

export const SingleSong = () => {
  const { authIsLoading } = React.useContext(CurrentUserContext);

  const location = useLocation();
  const songid = location.pathname.split("/")[2];

  const [loading, setLoading] = useState<boolean>(true);
  const [song, setSong] = useState<String>();
  const [chords, setChords] = useState<CHORD_TYPE[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [view, setView] = useState<String>("standard");
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState<boolean>(false);
  const [deleteMessage, setDeleteMessage] = useState<String>("");

  useEffect(() => {
    const fetchSong = async () => {
      setLoading(true);
      if (!authIsLoading) {
        try {
          // WE WILL ALSO NEED TO FETCH CHORDS!
          const resSong = await axios.get(
            "/api/songs/singleSong/id=" + String(songid)
          );
          setSong(resSong.data.name);

          const resChords = await axios.get(
            "/api/songs/allChords/id=" + String(songid)
          );

          let dbChords: CHORD_TYPE[] = [];

          for (const chord of resChords.data) {
            let chordObj: CHORD_TYPE = {
              chordArr: chord.chordNotes,
              chordName: chord.chordName,
            };
            dbChords.push(chordObj);
          }
          setChords(dbChords);
        } catch (error) {
          setError(true);
          console.log(`${(error as AxiosError)?.response?.data}`);
          if (
            `${(error as AxiosError)?.response?.data}` ===
            "user not permitted to view song"
          ) {
            console.error(error);
          }
        }
        setLoading(false);
      }
    };
    fetchSong();
  }, [songid, authIsLoading]);

  const handleViewChange = (view: String) => {
    view === "standard" ? setView("standard") : setView("lgScope");
  };

  const showDeleteModal = () => {
    setDeleteMessage("Are you sure you want to delete '" + song + "'?");

    setDisplayConfirmationModal(true);
  };

  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  const submitDelete = async () => {
    try {
      const res = await axios.delete("/api/songs/deleteSong/id=" + songid);
      if (res.status === 200) {
        window.open("http://localhost:3000/mySongs", "_self");
      }
    } catch (error) {
      console.error(error);
    }

    setDisplayConfirmationModal(false);
  };

  const { width } = useViewport();
  const breakpoint_mid_window = 1440;
  const breakpoint_small_window = 1160;

  return !error && !loading ? (
    <div>
      <ViewMenu handleViewChange={handleViewChange} view={view} />
      {view === "standard" ? (
        <Row className="gx-0">
          <Col />
          <Col
            xs={
              width > breakpoint_mid_window
                ? 8
                : width > breakpoint_small_window
                ? 10
                : 12
            }
          >
            <div className="columns">
              <div className="sectionTitles songOptions">
                <header className="sectionTitlesText">{song}</header>
                <div className="songOptions">
                  <div
                    style={{
                      color: "gray",
                      cursor: "not-allowed",
                      marginRight: "1rem",
                    }}
                  >
                    {" "}
                    <i className="fa-solid fa-edit fa-lg"></i> Edit
                  </div>
                  <div
                    style={{
                      color: "darkred",
                      cursor: "pointer",
                      marginRight: "1rem",
                    }}
                    onClick={() => showDeleteModal()}
                  >
                    <i className="fa-solid fa-trash-can fa-lg"></i> Delete
                  </div>
                </div>
              </div>

              <div style={{ paddingTop: "1rem" }}>
                <div
                  style={{
                    fontSize: "20px",
                  }}
                >
                  <Song chords={chords} miniFlag={view === "lgScope"} />
                </div>
              </div>
            </div>
          </Col>
          <Col />
        </Row>
      ) : (
        <div>
          <Song chords={chords} miniFlag={view === "lgScope"} />
        </div>
      )}
      <DeleteConfirmation
        showModal={displayConfirmationModal}
        confirmModal={submitDelete}
        hideModal={hideConfirmationModal}
        message={deleteMessage}
      />
    </div>
  ) : (
    <div>
      {!loading ? (
        <div>
          Sorry, this song either doesn't exist or doesn't belong to you!
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
