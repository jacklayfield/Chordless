import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useViewport } from "../hooks/useViewport";

import { Loading } from "../components/general/loading";

import { BASE_URL_API, BASE_URL_CLIENT } from "../api/request";

import Google from "../images/google.png";
import "../styling/login.css";

export const Login = () => {
  const { width } = useViewport();
  const breakpoint = 1100;
  const google = () => {
    window.open(BASE_URL_API + "/auth-google/google", "_self");
  };

  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      setSuccess(false);
      setError(false);
      const res = await axios.post(BASE_URL_API + "/api/auth-standard/login", {
        data: { form },
      });
      if (res.status === 200) {
        setLoading(false);
        setSuccess(true);
        //Store the username in localStorage for setting NavBar
        localStorage.setItem("username", String(form.username));
        await new Promise((r) => setTimeout(r, 1000));
        window.open("/mySongs", "_self");
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      if (`${(error as AxiosError)?.response?.data}` === "Wrong credentials!") {
        console.error(error);
      }
    }
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  if (loading) {
    return <Loading />;
  } else if (success) {
    return (
      <div className="center">
        <div className={width > breakpoint ? "cover" : "cover small-window"}>
          <h1 className="login-text">Login</h1>
          <div>
            <h4 className="login-status success">Login Successful!</h4>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="center">
        <form
          className={width > breakpoint ? "cover" : "cover small-window"}
          onSubmit={handleSubmit}
        >
          <h1 className="login-text">Login</h1>
          <div className="input-container">
            <input
              type="text"
              name="username"
              placeholder="username"
              required
              onChange={handleFormChange}
            />
          </div>
          <div className="input-container bottom">
            <input
              type="password"
              name="password"
              placeholder="password"
              required
              onChange={handleFormChange}
            />
          </div>
          <button className="login-btn">Login</button>
          <span>
            New user? Sign up{" "}
            <a href={BASE_URL_CLIENT + "/createAccount"}>Here</a>
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
  }
};
