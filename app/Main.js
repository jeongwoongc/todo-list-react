import React from "react";
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
  return (
    <BrowserRouter>
      {/* <Header />
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
      <Menu /> */}
      <HomeGuest />
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<ExampleComponent />);

if (module.hot) {
  module.hot.accept();
}
