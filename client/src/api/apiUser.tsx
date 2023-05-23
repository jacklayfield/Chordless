import axios from "axios";
import { BASE_URL } from "./request";

export const updateNameRequest = async (name: String) => {
  return axios
    .put(BASE_URL + "/api/users/updateName", {
      data: { name },
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
};

export const updateBioRequest = async (bio: String) => {
  return axios
    .put(BASE_URL + "/api/users/updateBio", {
      data: { bio },
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
};

export const userDataRequest = async () => {
  return axios.get(BASE_URL + "/api/users/userdata").catch((err) => {
    console.error(err);
    return err;
  });
};
