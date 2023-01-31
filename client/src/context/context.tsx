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
    setAuthIsLoading(true);

    /* Here let's first check the users token. If it has expired,
     * we can refresh it using the refresh token and try once more.
     */
    axios
      .get("/api/users/userdata")
      .then((response) => {
        console.log("user: ", String(response.data.username));
        const user: UserType = {
          username: String(response.data.username),
          email: String(response.data.email),
        };
        setCurrentUser(user);
        setAuthIsLoading(false);
      })
      .catch((error) => {
        // Here we failed the regular token check, so we will now attempt to refresh the token
        console.error(error);
        axios
          .post("/api/auth-standard/refresh")
          .then((response) => {
            if (response.data.accessToken) {
              console.log("Token refreshed");
            }
            // If we made it here then we have refreshed properly, so auth again
            axios
              .get("/api/users/userdata")
              .then((response) => {
                console.log("user: ", String(response.data.username));
                const user: UserType = {
                  username: String(response.data.username),
                  email: String(response.data.email),
                };
                setCurrentUser(user);
                setAuthIsLoading(false);
              })
              .catch((error) => {
                console.error(error);
                setCurrentUser({} as UserType);
                setAuthIsLoading(false);
              });
          })
          .catch((error) => {
            console.error(error);
            setCurrentUser({} as UserType);
            setAuthIsLoading(false);
          });
      });
  };

  const handleLogout = async () => {
    axios.get("/api/auth-standard/logout").catch((error) => {
      console.error(error);
    });

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
