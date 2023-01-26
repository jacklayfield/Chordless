import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CreateSong } from "./pages/createSong";
import { NavBar } from "./components/navBar";
import { About } from "./pages/about";
import { Login } from "./pages/login";
import { CreateAccount } from "./pages/createAccount";
import { CurrentUserProvider } from "./context/context";
import { Songs } from "./pages/songs";

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
          <Route path="/songs" element={<Songs />} />
        </Routes>
      </Router>
    </CurrentUserProvider>
  );
}

export default App;
