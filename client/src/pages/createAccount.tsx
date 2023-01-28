import React, { useState } from "react";
import Google from "../google.png";
import "../styling/login.css";
import "../styling/theme.css";
import axios from "axios";

export const CreateAccount = () => {
  const google = () => {
    window.open("http://localhost:8000/auth-google/google", "_self");
  };
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await axios.post("/api/auth-standard/create", {
        data: { username, email, password },
      });
      console.log(res.data);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  return (
    <div className="center">
      <form className="cover" onSubmit={handleSubmit}>
        <h1 className="login-text">Create Account</h1>

        <div className="input-container">
          <input
            type="text"
            placeholder="username"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="input-container bottom">
          <input
            type="password"
            placeholder="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button className="login-btn">Create Account</button>
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
