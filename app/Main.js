import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Component Modules
import Header from "./components/Header";
import Menu from "./components/Menu";
import List from "./components/List";
import About from "./components/About";
import Terms from "./components/Terms";
import Privacy from "./components/Privacy";
import Important from "./components/Important";
import Planned from "./components/Planned";
import Profile from "./components/Profile";
import HomeGuest from "./components/HomeGuest";

function ExampleComponent() {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("loggedIn")));
  console.log("loggedIn: ", loggedIn);

  return (
    <BrowserRouter>
      <HomeGuest loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/my-day" element={<List />} />
        <Route path="/important" element={<Important />} />
        <Route path="/planned" element={<Planned />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/my-profile" element={<Profile />} />
      </Routes>
      <Menu loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<ExampleComponent />);

if (module.hot) {
  module.hot.accept();
}
