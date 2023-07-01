import React, { useState, useReducer, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { useImmerReducer } from "use-immer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";

// Component Modules
import Header from "./components/Header";
import Menu from "./components/Menu";
import List from "./components/List";
import About from "./components/About";
import Terms from "./components/Terms";
import Privacy from "./components/Privacy";
import Important from "./components/Important";
import Profile from "./components/Profile";
import HomeGuest from "./components/HomeGuest";
import FlashMessages from "./components/FlashMessages";

function ExampleComponent() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("loggedIn")),
    flashMessages: [],
    user: {
      username: localStorage.getItem("username"),
      email: localStorage.getItem("email"),
      user_id: localStorage.getItem("userId")
    },
    userSecret: {
      csrftoken: localStorage.getItem("csrftoken")
    },
    userItems: localStorage.getItem("list"),
    Items: []
  };

  function reducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true;
        draft.user = action.data;
        draft.userSecret = action.secret;
        return;
      case "logout":
        draft.loggedIn = false;
        return;
      case "flashMessage":
        draft.flashMessages.push(action.value);
        return;
      case "loadItems":
        draft.userItems = JSON.stringify(action.data);
        localStorage.setItem("list", draft.userItems);
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(reducer, initialState);

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("username", state.user.username);
      localStorage.setItem("email", state.user.email);
      localStorage.setItem("csrftoken", state.userSecret.csrftoken);
      localStorage.setItem("loggedIn", state.loggedIn);
      localStorage.setItem("list", state.userItems);
      localStorage.setItem("userId", state.user.user_id);
    } else {
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("csrftoken");
      localStorage.removeItem("loggedIn");
    }
  }, [state.loggedIn]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessages messages={state.flashMessages} />
          <HomeGuest />
          <Header />
          <Routes>
            <Route path="/" element={state.loggedIn ? <List items={state.userItems}/> : <></>} />
            <Route path="/my-day" element={state.loggedIn ? <List items={state.userItems}/> : <></>} />
            <Route path="/important" element={state.loggedIn ? <Important /> : <></>} />
            <Route path="/about-us" element={state.loggedIn ? <About /> : <></>} />
            <Route path="/terms" element={state.loggedIn ? <Terms /> : <></>} />
            <Route path="/privacy" element={state.loggedIn ? <Privacy /> : <></>} />
            <Route path="/my-profile" element={state.loggedIn ? <Profile /> : <></>} />
          </Routes>
          <Menu />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<ExampleComponent />);

if (module.hot) {
  module.hot.accept();
}
