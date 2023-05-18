import axios from "axios";
import { CHORD_TYPE } from "../pages/createSong";

export const updateNameRequest = async (name: String) => {
  return axios
    .put("/api/users/updateName", {
      data: { name },
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
};

export const updateBioRequest = async (bio: String) => {
  return axios
    .put("/api/users/updateBio", {
      data: { bio },
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
};

export const userDataRequest = async () => {
  return axios.get("/api/users/userdata").catch((err) => {
    console.error(err);
    return err;
  });
};
