import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios, { Axios } from "axios";
import Cookies from "js-cookie";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://localhost:8000"
});

function HomeGuest(props) {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isLogin) {
      try {
        await client.post("api/register", { username, email, password }).then(function (res) {
          client.post("api/login", { email, password }).then(function (res) {
            client.get("api/user").then(function (res) {
              appDispatch({ type: "login", data: res.data.user, secret: { ["csrftoken"]: Cookies.get("csrftoken") } });
            });
            console.log("User was registered and logged.");
            navigate("/");
            appDispatch({ type: "flashMessage", value: "You have successfully created an account and are now logged in!" });
          });
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        await client.post("api/login", { email, password }).then(function (res) {
          client.get("api/user").then(function (res) {
            // add in csrftoken to user object to be alwasy there even after refresh
            appDispatch({ type: "login", data: res.data.user, secret: { ["csrftoken"]: Cookies.get("csrftoken") } });
          });
          console.log("User was successfully logged in.");
          navigate("/");
          appDispatch({ type: "flashMessage", value: "You have successfully logged in!" });
        });
      } catch (e) {
        console.log(e);
      }
    }
  }

  const clearForm = () => {
    setIsLogin(!isLogin);
    // Clear input fields when switching to login/signup
    setUsername("");
    setEmail("");
    setPassword("");
  };

  // save the state of either login or signup to local storage

  // load the state of either login or signup from local storage
  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin") === "true";
    setIsLogin(isLogin);
  }, []);

  // when reloaded stay on either login or signup
  useEffect(() => {
    localStorage.setItem("isLogin", isLogin);
  }, [isLogin]);

  // if logged in, go to privacy page directly without refreshing

  return (
    <>
      {appState.loggedIn ? (
        <></>
      ) : (
        <div className="home-guest">
          <div className="home-guest-card">
            <h2>{isLogin ? "Login" : "Sign Up"}</h2>
            <form onSubmit={handleSubmit}>
              {!isLogin && <input type="text" placeholder="Username" autoComplete="off" id="username" value={username} onChange={e => setUsername(e.target.value)} />}
              <br />
              <input type="email" placeholder="Email" autoComplete="off" id="email" value={email} onChange={e => setEmail(e.target.value)} />
              <br />
              <input type="password" placeholder="Password" id="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)} />
              <br />
              <br />
              <button className="guest-submit" role="button">
                <span>{isLogin ? "Login" : "Sign Up"}</span>
              </button>
            </form>
            <br />
            <p>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button className="toggle-btn" onClick={clearForm}>
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default HomeGuest;
