import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { ChordManager } from "../components/song/chordManager";
import { MiniChords } from "../components/song/miniChords";
import { ViewMenu } from "../components/general/viewMenu";
import { DeleteConfirmation } from "../components/general/deleteConfirmation";
import React from "react";
import { ErrorView } from "../components/general/errorView";
import { CHORD_TYPE } from "./createSong";
import {
  allChordsRequest,
  deleteChordsRequest,
  deleteSongRequest,
  insertChordsRequest,
  singleSongRequest,
  updateChordsRequest,
  updateSongNameRequest,
} from "../api/apiSong";
import { BASE_URL_CLIENT, apiRequest } from "../api/request";
import { findAxiosError } from "../api/error";
import { Loading } from "../components/general/loading";
import { toast, ToastContainer } from "react-toastify";
import CurrentUserContext from "./../context/context";
import { ApiConnecting } from "../components/general/apiConnecting";
import { Container } from "react-bootstrap";

export const SingleSong = () => {
  const { handleLogout, apiIsLoading, currentUser } =
    React.useContext(CurrentUserContext);
  const location = useLocation();
  const songid = location.pathname.split("/")[2];

  const SUCCESS = 0;

  const [loading, setLoading] = useState<boolean>(true);
  const [song, setSong] = useState<String>("");
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

      const resSong = await apiRequest(() => singleSongRequest(songid));
      const resChords = await apiRequest(() => allChordsRequest(songid));

      if (resSong.status === 200 && resChords.status === 200) {
        setSong(resSong.data.name);

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
      } else {
        setError(findAxiosError(resSong));
      }

      setLoading(false);
    };
    fetchSong();
  }, [songid]);

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
      setDisplayConfirmationModal(false);
      window.open(BASE_URL_CLIENT + "/mySongs", "_self");
    } else {
    }
  };

  const updateSong = async (
    newSong: CHORD_TYPE[],
    updatedChords: CHORD_TYPE[],
    deletedChordIndicies: number[]
  ) => {
    if (updatedChords.length > 0) {
      // put request for updating chords
      const res = await apiRequest(() =>
        updateChordsRequest(updatedChords, songid)
      );
      if (res.status !== 200) {
        /*Failmsg */
      }
    }

    if (deletedChordIndicies.length > 0) {
      const res = await apiRequest(() =>
        deleteChordsRequest(deletedChordIndicies, songid)
      );
      if (res.status !== 200) {
        /*Failmsg */
      }
    }

    // If we find a chord with a negative id, we know there are new chords to be inserted
    if (newSong.map((e) => e.chordId).some((x) => x < 0)) {
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

  const handleUpdateName = async () => {
    let res = await apiRequest(() => updateSongNameRequest(songid, song));
    console.log(res.status);
    if (res.status === 200) {
      setSong(song);
      toast.success("Song name updated!", {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      handleLogout();
    }
    setEditName(false);
  };

  if (apiIsLoading) {
    return <ApiConnecting />;
  } else if (loading) {
    return <Loading />;
  } else if (error !== SUCCESS) {
    return <ErrorView errType={error} />;
  } else {
    return (
      <>
        <ToastContainer autoClose={8000} />

        <button
          className="chordless-btn delete-song"
          onClick={() => showDeleteModal()}
        >
          <i className="fa-solid fa-trash-can fa-lg p-1"></i> Delete
        </button>
        <ViewMenu handleViewChange={handleViewChange} view={view} />
        <div className="center-div">
          <div className="song-options">
            {editName ? (
              <>
                <input
                  type="text"
                  id="bio"
                  defaultValue={String(song)}
                  placeholder="Song Name"
                  onChange={(event) => setSong(event.target.value)}
                />
                <button
                  type="submit"
                  className="btn btn-success p-1 m-2"
                  onClick={handleUpdateName}
                >
                  Save Name
                </button>
              </>
            ) : (
              <>
                <h1>{song}</h1>
                <div className="song-options-edit">
                  <i
                    className="fa-solid fa-edit fa-lg"
                    onClick={() => setEditName(true)}
                  ></i>
                </div>{" "}
              </>
            )}
          </div>
        </div>

        {view === "standard" ? (
          <div className="inner-div">
            <ChordManager
              chords={chords}
              updateSong={updateSong}
              sound={
                currentUser?.preferences != undefined
                  ? currentUser.preferences[0]
                  : "Acoustic"
              }
            />
          </div>
        ) : (
          <Container>
            <MiniChords chords={chords} />
          </Container>
        )}
        <DeleteConfirmation
          showModal={displayConfirmationModal}
          confirmModal={submitDelete}
          hideModal={hideConfirmationModal}
          message={deleteMessage}
        />
      </>
    );
  }
};
