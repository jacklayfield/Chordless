import React, { useState } from "react";
import Google from "../google.png";
import "../styling/login.css";
import "../styling/theme.css";
import axios from "axios";

export const Login = () => {
  const google = () => {
    window.open("http://localhost:8000/auth-google/google", "_self");
  };
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      console.log(username);
      const res = await axios
        .post("/api/auth-standard/login", {
          data: { username, password },
        })
        .then((response) => {
          if (response.data.accessToken) {
            localStorage.setItem("chordless-token", response.data.accessToken);
          }
        });
      console.log("HERE");
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };
  return (
    <div className="center">
      <form className="cover" onSubmit={handleSubmit}>
        <h1 className="login-text">Login</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="username"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="input-container bottom">
          <input
            type="password"
            placeholder="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button className="login-btn">Login</button>
        <span>
          New user? Sign up{" "}
          <a href="http://localhost:3000/createAccount">Here</a>
        </span>
        <h4 className="alt-login-text">Or</h4>
        <div className="alt-login">
          <button disabled className="login-btn google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            <span className="google-login-text">Login with Google</span>
          </button>
        </div>
      </form>
    </div>
  );
};
