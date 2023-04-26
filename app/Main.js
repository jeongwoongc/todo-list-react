import React from "react";
import ReactDOM from "react-dom/client";

// Component Modules
import Header from "./components/Header";
import Menu from "./components/Menu";
import List from "./components/List";

function ExampleComponent() {
  return (
    <>
      <Header />
      <Menu />
      <List />
    </>
  );
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<ExampleComponent />);

if (module.hot) {
  module.hot.accept();
}
