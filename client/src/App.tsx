import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateSong } from "./pages/createSong";
import { NavBar } from "./components/theme/navBar";
import { About } from "./pages/about";
import { Login } from "./pages/login";
import { CreateAccount } from "./pages/createAccount";
import { CurrentUserProvider } from "./context/context";
import { MySongs } from "./pages/mySongs";
import { Profile } from "./pages/profile";
import { SingleSong } from "./pages/singleSong";
import { Test } from "./pages/test";
import { ErrorView } from "./components/general/errorView";
import { Layout } from "./components/theme/layout";

function App() {
  return (
    <Routes>
      <Route
        path="/createSong"
        element={<Layout children={<CreateSong />} name={"Create Song"} />}
      />
      <Route
        path="/about"
        element={<Layout children={<About />} name={"About"} />}
      />
      <Route
        path="/mySongs"
        element={<Layout children={<MySongs />} name={"My Songs"} />}
      />
      <Route
        path="/profile"
        element={<Layout children={<Profile />} name={"Profile"} />}
      />
      <Route
        path="/song/:songid"
        element={<Layout children={<SingleSong />} name={"Song View"} />}
      />
      <Route path="/test" element={<Test />} />
      <Route path="*" element={<ErrorView errType={404} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/createAccount" element={<CreateAccount />} />
    </Routes>
  );
}

export default App;
