import * as React from "react";
import axios from "axios";

// axios.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("chordless-token");
//     config.headers.authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export type UserType = {
  username: string;
  email: string;
};
export type UserContext = {
  currentUser?: UserType;
  setCurrentUser: (user: UserType) => void;
  checkLogin: () => void;
  setAuthIsLoading: (isLoading: boolean) => void;
  authIsLoading: boolean;
  handleLogout: () => void;
};
const CurrentUserContext = React.createContext<UserContext>({} as UserContext);

export default CurrentUserContext;

type ProviderProps = {
  children: React.ReactNode;
};
export const CurrentUserProvider = ({ children }: ProviderProps) => {
  const [currentUser, setCurrentUser] = React.useState<UserType>(
    {} as UserType
  );
  const [authIsLoading, setAuthIsLoading] = React.useState(true);

  React.useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const refreshToken = localStorage.getItem("refresh-token");

    console.log(refreshToken);

    console.log("CHECKING LOGIN");

    setAuthIsLoading(true);

    //If the user has a refresh token, let's refresh the access token
    if (refreshToken) {
      console.log("IN HERE111");
      const res = await axios
        .post("/api/auth-standard/token=" + refreshToken)
        .then((response) => {
          if (response.data.accessToken) {
            localStorage.setItem("chordless-token", response.data.accessToken);
          }
        })
        .catch((_error) => {
          console.log(_error);
        });
    }

    //grab the newest token
    const token = localStorage.getItem("chordless-token");

    console.log(token);

    //authenticate the token and return user data
    if (token) {
      console.log("IN HERE112");
      const res = await axios
        .get("/api/users/id=" + token)
        .then((response) => {
          console.log("CURRENT USER RES", String(response.data.username));
          const user: UserType = {
            username: String(response.data.username),
            email: String(response.data.email),
          };
          setCurrentUser(user);
          setAuthIsLoading(false);
        })
        .catch((_error) => {
          setCurrentUser({} as UserType);
          setAuthIsLoading(false);
        });
    } else {
      setCurrentUser({} as UserType);
      setAuthIsLoading(false);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("chordless-token");
    setCurrentUser({} as UserType);
  };

  const stateValues = {
    currentUser,
    setCurrentUser,
    checkLogin,
    setAuthIsLoading,
    authIsLoading,
    handleLogout,
  };

  return (
    <CurrentUserContext.Provider value={stateValues}>
      {children}
    </CurrentUserContext.Provider>
  );
};
