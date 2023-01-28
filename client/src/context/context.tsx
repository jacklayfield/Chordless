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
    console.log("CHECKING LOGIN");

    setAuthIsLoading(true);

    // Refresh our token
    const res = await axios
      .post("/api/auth-standard/refresh")
      .then((response) => {
        //handle failure nicely here
      })
      .catch((_error) => {
        console.log(_error);
      });

    // Auth our current token and return back our user data if successful
    const res2 = await axios
      .get("/api/users/userdata")
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
  };

  const handleLogout = async () => {
    console.log("clicked");
    try {
      const res2 = await axios.get("/api/auth-standard/logout");
    } catch (error) {
      console.log("Error with logout");
    }

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
