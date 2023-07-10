import React, { useState, useEffect, useContext } from "react";
import MenuButton from "./MenuShow";
import { Link } from "react-router-dom";
import axios, { Axios } from "axios";
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://localhost:8000"
});

function Header(props) {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  function handleLogout() {
    client
      .post("api/logout")
      .then(function (res) {
        console.log("User was successfully logged out.");
        appDispatch({ type: "logout" });
        appDispatch({ type: "flashMessage", value: "You have successfully logged out" });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      {appState.loggedIn ? (
        <header>
          <div className="header-div">
            <MenuButton id="btn-menu"></MenuButton>
            <Link className="todo-a" to="/">
              To Do
            </Link>
            <form className="search-bar">
              <div className="dis">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </div>
              <input id="search" type="text" name="search" placeholder="Search" autoComplete="off" />
            </form>
            <button id="btn-profile" type="button" className="btn"></button>
            <div className="dropdown">
              <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="whitesmoke" className="bi bi-person-circle" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                </svg>
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li>
                  <Link className="dropdown-item" to="/my-profile">
                    My Profile
                  </Link>
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </header>
      ) : (
        <></>
      )}
    </>
  );
}

export default Header;
