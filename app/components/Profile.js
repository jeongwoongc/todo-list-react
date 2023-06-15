import React, { useEffect } from "react";

function Profile() {
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
          <ol>
            <li>Name</li>
            <li>Email</li>
          </ol>
        </div>
        <div className="taskform"></div>
      </div>
    </form>
  );
}

export default Profile;
