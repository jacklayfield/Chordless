import axios from "axios";
import { findAxiosError } from "./error";

axios.defaults.withCredentials = true;

//(for local development)
// export const BASE_URL_CLIENT = "http://localhost:3000";
// export const BASE_URL_API = "http://localhost:8000";

//for deployment
export const BASE_URL_CLIENT = "https://app.chordless.net";
export const BASE_URL_API = "https://api.chordless.net";

export const apiRequest = async (reqFunction: Function) => {
  let res = await reqFunction();
  if (findAxiosError(res) === 403) {
    const tokenRes = await refreshToken();
    if (tokenRes.status === 200) {
      res = await reqFunction();
    }
  }
  return res;
};

export const refreshToken = async () => {
  return axios
    .post(BASE_URL_API + "/api/auth-standard/refresh")
    .catch((err) => {
      console.error(err);
      return err;
    });
};
