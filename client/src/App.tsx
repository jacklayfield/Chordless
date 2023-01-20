import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CreateSong } from "./pages/createSong";
import { NavBar } from "./components/navBar";
import { About } from "./pages/about";
import { Login } from "./pages/login";
import { CreateAccount } from "./pages/createAccount";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/createSong" element={<CreateSong />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createAccount" element={<CreateAccount />} />
      </Routes>
    </Router>
  );
}

export default App;
