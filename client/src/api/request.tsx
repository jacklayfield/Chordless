import axios, { AxiosError } from "axios";
import { findAxiosError } from "./error";

// export const BASE_URL = "http://localhost:8000"; //(for local development)
export const BASE_URL = "http://chordless-api"; //(for deployment)

export const apiRequest = async (reqFunction: Function) => {
  let res = await reqFunction();
  console.log("res" + `${(res as AxiosError)?.response?.status}`);
  if (findAxiosError(res) === 403) {
    console.log("Refreshing token");
    const tokenRes = await refreshToken();
    if (tokenRes.status === 200) {
      console.log("Successful refresh, re-executing function");
      res = await reqFunction();
      console.log("function completed");
    }
  }
  return res;
};

export const refreshToken = async () => {
  return axios.post(BASE_URL + "/api/auth-standard/refresh").catch((err) => {
    console.error(err);
    return err;
  });
};
