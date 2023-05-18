import axios from "axios";
import { isForbidden } from "../utils/general";

export const apiRequest = async (reqFunction: Function) => {
  let res = await reqFunction();
  if (isForbidden(res)) {
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
