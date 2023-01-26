import * as React from "react";
import axios from "axios";

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
    const token = localStorage.getItem("chordless-token");

    console.log(token);

    console.log("CHECKING LOGIN");

    setAuthIsLoading(true);

    if (token) {
      // const res = await axios.get("/api/users/id=" + token);
      // console.log(res);
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
