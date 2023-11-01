import * as React from "react";
import axios from "axios";
import { BASE_URL_API, apiRequest } from "../api/request";
import { userDataRequest } from "../api/apiUser";

export type UserType = {
  id: number;
  username: string;
  email: string;
  name: string | null;
  bio: string | null;
  preferences: string[];
};
export type UserContext = {
  currentUser?: UserType;
  setCurrentUser: (user: UserType) => void;
  checkLogin: (allowReload: boolean) => Promise<void>;
  setAuthIsLoading: (isLoading: boolean) => void;
  setApiIsLoading: (isLoading: boolean) => void;
  apiIsLoading: boolean;
  authIsLoading: boolean;
  handleLogout: () => void;
};
const CurrentUserContext = React.createContext<UserContext>({} as UserContext);

export default CurrentUserContext;

type ProviderProps = {
  children: React.ReactNode;
};

export const refreshToken = async () => {
  try {
    const res = await axios.post("/api/auth-standard/refresh");
    if (res.status === 200) {
      console.log("token refreshed");
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
export const CurrentUserProvider = ({ children }: ProviderProps) => {
  const [currentUser, setCurrentUser] = React.useState<UserType>(
    {} as UserType
  );
  const [authIsLoading, setAuthIsLoading] = React.useState(true);

  const [apiIsLoading, setApiIsLoading] = React.useState(false);

  React.useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    setAuthIsLoading(true);
    setApiIsLoading(false);

    const res = await apiRequest(() => userDataRequest());

    if (res.status === 200) {
      // Successfully fetched user data
      const user: UserType = {
        id: res.data.id,
        username: String(res.data.username),
        email: String(res.data.email),
        name: res.data.name,
        bio: res.data.bio,
        preferences: res.data.preferences,
      };
      setCurrentUser(user);
      setAuthIsLoading(false);
    } else if (res.code == "ERR_NETWORK" || res.code == "ECONNABORTED") {
      setApiIsLoading(true);
      await new Promise((r) => setTimeout(r, 10000));
      window.location.reload();
    } else {
      // Unsuccessful fetch, remove any existing data
      localStorage.removeItem("username");
      setCurrentUser({} as UserType);
      setAuthIsLoading(false);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("username");
    setCurrentUser({} as UserType);
    await axios
      .get(BASE_URL_API + "/api/auth-standard/logout")
      .catch((error) => {
        console.error(error);
      });
    window.location.reload();
  };

  const stateValues = {
    currentUser,
    setCurrentUser,
    checkLogin,
    setAuthIsLoading,
    setApiIsLoading,
    apiIsLoading,
    authIsLoading,
    handleLogout,
  };

  return (
    <CurrentUserContext.Provider value={stateValues}>
      {children}
    </CurrentUserContext.Provider>
  );
};
