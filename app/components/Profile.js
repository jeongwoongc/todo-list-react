import React, { useEffect } from "react";

function Profile() {

  useEffect(() => {
    const sidebarState = localStorage.getItem("isToggled");
    const myForm = document.querySelector(".myForm");

    if (sidebarState === "true") {
      myForm.classList.add("move");
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
