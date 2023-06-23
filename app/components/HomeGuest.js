import React, { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import Cookies from "js-cookie";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://localhost:8000"
});

function HomeGuest(props) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    client
      .get("api/user")
      .then(function (res) {
        console.log("User is logged in.");
        localStorage.setItem("loggedIn", true);
        props.setLoggedIn(true);
      })
      .catch(function (error) {
        console.log("User is not logged in.");
        localStorage.setItem("loggedIn", "");
        props.setLoggedIn(false);
      });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isLogin) {
      try {
        await client.post("api/register", { username, email, password }).then(function (res) {
          client.post("api/login", { email, password }).then(function (res) {
            console.log("User was successfully created and logged in.");
            localStorage.setItem("csrftoken", Cookies.get("csrftoken"));
            localStorage.setItem("loggedIn", true);
            props.setLoggedIn(true);
          });
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        await client.post("api/login", { email, password }).then(function (res) {
          console.log("User was successfully logged in.");
          localStorage.setItem("csrftoken", Cookies.get("csrftoken"));
          localStorage.setItem("loggedIn", true);
          props.setLoggedIn(true);
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
      {props.loggedIn ? (
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
