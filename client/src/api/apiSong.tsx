import axios from "axios";
import { CHORD_TYPE } from "../pages/createSong";

export const createSongRequest = async (
  songName: String,
  chords: CHORD_TYPE[]
) => {
  return axios
    .post("/api/songs/create", {
      data: { songName, chords },
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
};

export const deleteSongRequest = async (songid: String) => {
  return axios.delete("/api/songs/deleteSong/id=" + songid).catch((err) => {
    console.error(err);
    return err;
  });
};

export const updateChordsRequest = async (updatedChords: CHORD_TYPE[]) => {
  return axios
    .put("/api/songs/updateChords", {
      data: { updatedChords },
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
};

export const insertChordsRequest = async (
  newSong: CHORD_TYPE[],
  songid: String
) => {
  return axios
    .post("/api/songs/insertChords", {
      data: { newSong, songid },
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
};

export const deleteChordsRequest = async (deletedChordIndicies: number[]) => {
  return axios
    .put("/api/songs/deleteChords", {
      data: { deletedChordIndicies },
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
};
