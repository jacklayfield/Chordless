import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <CurrentUserProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/createSong" element={<CreateSong />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createAccount" element={<CreateAccount />} />
          <Route path="/mySongs" element={<MySongs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/test" element={<Test />} />
          <Route path="/song/:songid" element={<SingleSong />} />
          <Route path="*" element={<ErrorView errType={404} />} />
        </Routes>
      </Router>
    </CurrentUserProvider>
  );
}

export default App;
