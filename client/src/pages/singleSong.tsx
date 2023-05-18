import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { ChordManager } from "../components/song/chordManager";
import { MiniChords } from "../components/song/miniChords";
import { Row, Col } from "react-bootstrap";
import { useViewport } from "../hooks/useViewport";
import { ViewMenu } from "../components/general/viewMenu";
import { DeleteConfirmation } from "../components/general/deleteConfirmation";
import CurrentUserContext from "../context/context";
import React from "react";
import { Error404 } from "../components/general/error404";
import { CHORD_TYPE } from "./createSong";
import { isForbidden } from "../utils/general";
import {
  deleteChordsRequest,
  deleteSongRequest,
  insertChordsRequest,
  updateChordsRequest,
} from "../api/apiSong";
import { apiRequest } from "../api/request";

export const SingleSong = () => {
  const { authIsLoading, handleLogout } = React.useContext(CurrentUserContext);

  const location = useLocation();
  const songid = location.pathname.split("/")[2];

  const ERROR_GENERAL = 1;
  const SUCCESS = 0;
  const ERROR_404 = 404;
  const ERROR_403 = 403;

  const [loading, setLoading] = useState<boolean>(true);
  const [song, setSong] = useState<String>();
  const [chords, setChords] = useState<CHORD_TYPE[]>([]);
  const [error, setError] = useState<number>(SUCCESS);
  const [view, setView] = useState<String>("standard");
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState<boolean>(false);
  const [deleteMessage, setDeleteMessage] = useState<String>("");
  const [editName, setEditName] = useState<boolean>(false);

  useEffect(() => {
    const fetchSong = async () => {
      setLoading(true);
      setError(SUCCESS);
      if (!authIsLoading) {
        try {
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
              chordId: chord.id,
            };
            dbChords.push(chordObj);
          }
          setChords(dbChords);
        } catch (error) {
          if (isForbidden(error)) {
            console.error(error);
            setError(ERROR_403);
          } else if (`${(error as AxiosError)?.response?.status}` === "404") {
            console.log("got into 404");
            setError(ERROR_404);
          } else {
            setError(ERROR_GENERAL);
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
    const res = await apiRequest(() => deleteSongRequest(songid));

    if (res.status === 200) {
      console.log("SUCCESS");
      setDisplayConfirmationModal(false);
      window.open("http://localhost:3000/mySongs", "_self");
    } else {
      console.log("FAIL");
    }
  };

  const updateSong = async (
    newSong: CHORD_TYPE[],
    updatedChords: CHORD_TYPE[],
    deletedChordIndicies: number[]
  ) => {
    if (updatedChords.length > 0) {
      // put request for updating chords
      const res = await apiRequest(() => updateChordsRequest(updatedChords));
      if (res.status !== 200) {
        /*Failmsg */
      }
    }

    if (deletedChordIndicies.length > 0) {
      const res = await apiRequest(() =>
        deleteChordsRequest(deletedChordIndicies)
      );
      if (res.status !== 200) {
        /*Failmsg */
      }
    }

    // If we find a chord with a negative id, we know there are new chords to be inserted
    if (newSong.map((e) => e.chordId).some((x) => x < 0)) {
      console.log("negative found");
      const res = await apiRequest(() => insertChordsRequest(newSong, songid));
      if (res.status !== 200) {
        /*Failmsg */
      }
    }

    /** Do a page refresh. Yes I know, bad practice for React, but in this case for now we want
     * to just re-issue the retrieval of the correct DB version due to potential indexing
     * changes, and we DO NOT want to just update the chordArray with what we have on client.
     *
     * TODO: Look into better ways of handling this.
     **/
    window.location.reload();
  };

  const handleUpdateName = async (event: React.FormEvent<HTMLFormElement>) => {
    setEditName(false);
  };

  const { width } = useViewport();
  const breakpoint_mid_window = 1440;
  const breakpoint_small_window = 1160;

  return error === SUCCESS && !loading ? (
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
              <div className="section-titles song-options">
                {editName ? (
                  <div className="flex-container">
                    <input
                      className="song-name-input m-1"
                      type="text"
                      id="title"
                      defaultValue={String(song)}
                      onChange={(event) => setSong(event.target.value)}
                    />
                    <div
                      className="song-options-save name-save"
                      onClick={() => setEditName(false)}
                    >
                      <i className="fa-solid fa-check fa-lg"></i>{" "}
                    </div>{" "}
                  </div>
                ) : (
                  <div className="song-options">
                    <header className="section-titles-text">{song}</header>
                    <div className="song-options-edit">
                      <i
                        className="fa-solid fa-edit fa-lg"
                        onClick={() => setEditName(true)}
                      ></i>
                    </div>{" "}
                  </div>
                )}

                <div className="song-options">
                  <div
                    className="song-options-delete"
                    onClick={() => showDeleteModal()}
                  >
                    <i className="fa-solid fa-trash-can fa-lg"></i> Delete
                  </div>
                </div>
              </div>
              <div className="inner-div">
                <ChordManager
                  chords={chords}
                  updateSong={updateSong}
                  createFlag={false}
                />
              </div>
            </div>
          </Col>
          <Col />
        </Row>
      ) : (
        <div>
          <MiniChords chords={chords} />
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
          {error === ERROR_404 && <Error404 />}
          {error === ERROR_403 && (
            <div>
              This song does not belong to you! It is possible you are logged
              out!
            </div>
          )}
          {error === ERROR_GENERAL && (
            <div>An error has occured fetching this song...</div>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
