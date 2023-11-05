import axios from "axios";
import { BASE_URL_API } from "./request";

export const updateNameRequest = async (name: String) => {
  return axios
    .put(BASE_URL_API + "/api/users/updateName", {
      data: { name },
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
};

export const updateBioRequest = async (bio: String) => {
  return axios
    .put(BASE_URL_API + "/api/users/updateBio", {
      data: { bio },
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
};

export const updatePreferencesRequest = async (preferences: String[]) => {
  return axios
    .put(BASE_URL_API + "/api/users/updatePreferences", {
      data: { preferences },
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
};

export const userDataRequest = async () => {
  return axios
    .get(BASE_URL_API + "/api/users/userdata", { timeout: 3000 })
    .catch((err) => {
      console.error(err);
      return err;
    });
};
