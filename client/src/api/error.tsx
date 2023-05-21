import { AxiosError } from "axios";

export const findAxiosError = (error: any) => {
  switch (String(`${(error as AxiosError)?.response?.status}`)) {
    case "403":
      return 403;
    case "404":
      return 404;
    case "401":
      return 401;
    default:
      return 1;
  }
};
