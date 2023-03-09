import React, { useState } from "react";
import Google from "../google.png";
import "../styling/login.css";
import "../styling/theme.css";
import axios, { AxiosError } from "axios";

export const Login = () => {
  const google = () => {
    window.open("http://localhost:8000/auth-google/google", "_self");
  };
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setSuccess(false);
      setError(false);
      const res = await axios.post("/api/auth-standard/login", {
        data: { username, password },
      });
      if (res.status == 200) {
        setSuccess(true);
        //Store the username in localStorage for setting NavBar
        localStorage.setItem("username", String(username));
        await new Promise((r) => setTimeout(r, 1000));
        window.open("http://localhost:3000/mySongs", "_self");
        console.log("Success");
      }
    } catch (error) {
      setError(true);
      console.log(`${(error as AxiosError)?.response?.data}`);
      if (`${(error as AxiosError)?.response?.data}` == "Wrong credentials!") {
        console.error(error);
      }
    }
  };

  return success ? (
    <div className="center">
      <div className="cover">
        <h1 className="login-text">Login</h1>
        <div>
          <h4 className="login-status success">Login Successful!</h4>
        </div>
      </div>
    </div>
  ) : (
    <div className="center">
      <form className="cover" onSubmit={handleSubmit}>
        <h1 className="login-text">Login</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="username"
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="input-container bottom">
          <input
            type="password"
            placeholder="password"
            required
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
        {error && (
          <div className="login-status">
            <text>Password and/or username is incorrect!</text>
          </div>
        )}
      </form>
    </div>
  );
};
