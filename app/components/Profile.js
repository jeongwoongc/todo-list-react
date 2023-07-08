import React, { useEffect } from "react";
import { useContext } from "react";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";

function Profile() {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  useEffect(() => {
    const sidebarState = localStorage.getItem("isToggled");
    const myForm = document.querySelector(".myForm");
    const taskform = document.querySelector(".taskform");
    const headingDay = document.querySelector(".headingDay");

    if (sidebarState === "true") {
      taskform.classList.add("move");
      headingDay.classList.add("move");
      myForm.classList.add("move");
    } else {
      taskform.classList.remove("move");
      headingDay.classList.remove("move");
      myForm.classList.remove("move");
    }
  });

  return (
    <form className="myForm" style={{ color: "whitesmoke" }}>
      <div className="headingDay">
        <div className="textTerms">
          <h1>Profile</h1>
          <ul >
            <li>{appState.user.username}</li>
            <li>{appState.user.email}</li>
            <li>{appState.user.user_id}</li>
          </ul>
        </div>
        <div className="taskform"></div>
      </div>
    </form>
  );
}

export default Profile;
