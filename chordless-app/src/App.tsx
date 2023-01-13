import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CreateSong } from "./pages/createSong";
import { NavBar } from "./components/navBar";
import { About } from "./pages/about";

function App() {
  document.body.classList.add("background-red");
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/createSong" element={<CreateSong />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;