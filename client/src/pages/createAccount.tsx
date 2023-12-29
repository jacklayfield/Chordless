import React, { useState } from "react";
import { useViewport } from "../hooks/useViewport";
import axios, { AxiosError } from "axios";

import { Loading } from "../components/general/loading";

import Google from "../images/google.png";

import { BASE_URL_API, BASE_URL_CLIENT } from "../api/request";

export const CreateAccount = () => {
  const { width } = useViewport();
  const breakpoint = 1100;
  const google = () => {
    window.open(BASE_URL_API + "/auth-google/google", "_self");
  };
  const [emailError, setEmailError] = useState<boolean>(false);
  const [usernameError, setusernameError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setusernameError(false);
      setEmailError(false);
      setSuccess(false);
      const res = await axios.post(BASE_URL_API + "/api/auth-standard/create", {
        data: { form },
      });
      if (res.status === 200) {
        setLoading(false);
        setSuccess(true);
        await new Promise((r) => setTimeout(r, 2000));
        window.open(BASE_URL_CLIENT + "/login", "_self");
      }
    } catch (error) {
      if (
        `${(error as AxiosError)?.response?.data}` === "email must be unique"
      ) {
        setLoading(false);
        setEmailError(true);
      }
      if (
        `${(error as AxiosError)?.response?.data}` === "username must be unique"
      ) {
        setLoading(false);
        setusernameError(true);
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
          <h1 className="login-text">Create Account</h1>
          <div>
            <h4 className="login-status success">
              Account Created! Redirecting to login...
            </h4>
            <div className="loading-spinner mb-2"></div>
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
          <h1 className="login-text">Create Account</h1>

          <div className="input-container">
            <input
              type="text"
              name="username"
              placeholder="username"
              minLength={3}
              required
              onChange={handleFormChange}
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              name="email"
              placeholder="email"
              minLength={7}
              required
              onChange={handleFormChange}
            />
          </div>
          <div className="input-container bottom">
            <input
              type="password"
              name="password"
              placeholder="password"
              minLength={6}
              required
              onChange={handleFormChange}
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
  }
};
