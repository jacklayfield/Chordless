import axios from "axios";
import { CHORD_TYPE } from "../pages/createSong";
import { BASE_URL } from "./request";

export const createSongRequest = async (
  songName: String,
  chords: CHORD_TYPE[]
) => {
  return axios
    .post(BASE_URL + "/api/songs/create", {
      data: { songName, chords },
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
};

export const deleteSongRequest = async (songid: String) => {
  return axios
    .delete(BASE_URL + "/api/songs/deleteSong/id=" + songid)
    .catch((err) => {
      console.error(err);
      return err;
    });
};

export const updateChordsRequest = async (updatedChords: CHORD_TYPE[]) => {
  return axios
    .put(BASE_URL + "/api/songs/updateChords", {
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
    .post(BASE_URL + "/api/songs/insertChords", {
      data: { newSong, songid },
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
};

export const deleteChordsRequest = async (deletedChordIndicies: number[]) => {
  return axios
    .put(BASE_URL + "/api/songs/deleteChords", {
      data: { deletedChordIndicies },
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
};

export const singleSongRequest = async (songid: String) => {
  return axios
    .get(BASE_URL + "/api/songs/singleSong/id=" + String(songid))
    .catch((err) => {
      console.error(err);
      return err;
    });
};

export const allChordsRequest = async (songid: String) => {
  return axios
    .get(BASE_URL + "/api/songs/allChords/id=" + String(songid))
    .catch((err) => {
      console.error(err);
      return err;
    });
};
