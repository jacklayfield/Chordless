import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { CurrentUserProvider } from "./context/context";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/theme/navBar";
import { ModeSwitch } from "./components/general/modeSwitch";

disableReactDevTools();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CurrentUserProvider>
      <BrowserRouter>
        <NavBar />
        <ModeSwitch />
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </CurrentUserProvider>
  </React.StrictMode>
);
