import axios from "axios";
import { findError } from "./error";

export const apiRequest = async (reqFunction: Function) => {
  let res = await reqFunction();
  if (findError(res) === 403) {
    const tokenRes = await refreshToken();
    if (tokenRes.status === 200) {
      res = await reqFunction();
    }
  }
  return res;
};

export const refreshToken = async () => {
  return axios.post("/api/auth-standard/refresh").catch((err) => {
    console.error(err);
    return err;
  });
};
