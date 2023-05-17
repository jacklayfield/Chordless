import axios from "axios";
import { CHORD_TYPE } from "../pages/createSong";

export async function createSongRequest(
  songName: String,
  chords: CHORD_TYPE[]
) {
  return axios
    .post("/api/songs/create", {
      data: { songName, chords },
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
}

export async function deleteSongRequest(songid: String) {
  return axios.delete("/api/songs/deleteSong/id=" + songid).catch((err) => {
    console.error(err);
    return err;
  });
}

export async function updateChordsRequest(updatedChords: CHORD_TYPE[]) {
  return axios
    .put("/api/songs/updateChords", {
      data: { updatedChords },
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
}

export async function insertChordsRequest(
  newSong: CHORD_TYPE[],
  songid: String
) {
  return axios
    .post("/api/songs/insertChords", {
      data: { newSong, songid },
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
}

export async function deleteChordsRequest(deletedChordIndicies: number[]) {
  return axios
    .put("/api/songs/deleteChords", {
      data: { deletedChordIndicies },
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
}
