import axios from "axios";
import { CHORD_TYPE } from "../pages/createSong";
import { BASE_URL_API } from "./request";

export const createSongRequest = async (
  songName: String,
  chords: CHORD_TYPE[]
) => {
  return axios
    .post(BASE_URL_API + "/api/songs/create", {
      data: { songName, chords },
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
};

export const deleteSongRequest = async (songid: String) => {
  return axios
    .delete(BASE_URL_API + "/api/songs/deleteSong/id=" + songid)
    .catch((err) => {
      console.error(err);
      return err;
    });
};

export const updateChordsRequest = async (
  updatedChords: CHORD_TYPE[],
  songId: String
) => {
  return axios
    .put(BASE_URL_API + "/api/songs/updateChords", {
      data: { updatedChords, songId },
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
};

export const insertChordsRequest = async (
  newSong: CHORD_TYPE[],
  songId: String
) => {
  return axios
    .post(BASE_URL_API + "/api/songs/insertChords", {
      data: { newSong, songId },
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
};

export const deleteChordsRequest = async (
  deletedChordIndicies: number[],
  songId: String
) => {
  return axios
    .put(BASE_URL_API + "/api/songs/deleteChords", {
      data: { deletedChordIndicies, songId },
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
};

export const singleSongRequest = async (songid: String) => {
  return axios
    .get(BASE_URL_API + "/api/songs/singleSong/id=" + String(songid))
    .catch((err) => {
      console.error(err);
      return err;
    });
};

export const allChordsRequest = async (songid: String) => {
  return axios
    .get(BASE_URL_API + "/api/songs/allChords/id=" + String(songid))
    .catch((err) => {
      console.error(err);
      return err;
    });
};
