import React, { useState } from "react";
import Google from "../images/google.png";
import axios, { AxiosError } from "axios";

export const CreateAccount = () => {
  const google = () => {
    window.open("http://localhost:8000/auth-google/google", "_self");
  };
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [usernameError, setusernameError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setusernameError(false);
      setEmailError(false);
      setSuccess(false);
      const res = await axios.post("/api/auth-standard/create", {
        data: { username, email, password },
      });
      if (res.status === 200) {
        setSuccess(true);
        await new Promise((r) => setTimeout(r, 2000));
        window.open("http://localhost:3000/login", "_self");
        console.log("Success");
      }
    } catch (error) {
      console.log(error);
      if (
        `${(error as AxiosError)?.response?.data}` === "email must be unique"
      ) {
        setEmailError(true);
      }
      if (
        `${(error as AxiosError)?.response?.data}` === "username must be unique"
      ) {
        setusernameError(true);
      }
    }
  };

  return success ? (
    <div className="center">
      <div className="cover">
        <h1 className="login-text">Create Account</h1>
        <div>
          <h4 className="login-status success">
            Account Created! Redirecting to login...
          </h4>
          <div className="loading-spinner mb-2"></div>
        </div>
      </div>
    </div>
  ) : (
    <div className="center">
      <form className="cover" onSubmit={handleSubmit}>
        <h1 className="login-text">Create Account</h1>

        <div className="input-container">
          <input
            type="text"
            placeholder="username"
            minLength={3}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="email"
            minLength={7}
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="input-container bottom">
          <input
            type="password"
            placeholder="password"
            minLength={6}
            required
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
        {emailError && (
          <div className="login-status">
            Sorry, that email is already in use!
          </div>
        )}
        {usernameError && (
          <div className="login-status">
            Sorry, that username is already taken!
          </div>
        )}
      </form>
    </div>
  );
};
