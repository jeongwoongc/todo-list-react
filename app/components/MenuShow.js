import React, { useEffect, useState } from "react";

const MenuButton = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [listToggled, setListToggled] = useState(false);

  useEffect(() => {
    const storedIsToggled = localStorage.getItem("isToggled") === "true";
    const storedListToggled = localStorage.getItem("listToggled") === "true";

    setIsToggled(storedIsToggled);
    setListToggled(storedListToggled);

    if (storedIsToggled && storedListToggled) {
      setIsToggled(true);
      setListToggled(true);
    }
  }, []);

  const handleMenuClick = () => {
    setIsToggled(prevState => !prevState);
    setListToggled(prevState => !prevState);
  };

  useEffect(() => {
    const sidebar = document.querySelector(".sidebar");
    const taskform = document.querySelector(".taskform");
    const headingDay = document.querySelector(".headingDay");
    const myForm = document.querySelector(".myForm");

    if (isToggled && listToggled) {
      sidebar.classList.add("showinstant");
      taskform.classList.add("move");
      headingDay.classList.add("move");
      myForm.classList.add("move");
    } else {
      sidebar.classList.remove("showinstant");
      taskform.classList.remove("move");
      headingDay.classList.remove("move");
      myForm.classList.remove("move");
    }

    localStorage.setItem("isToggled", isToggled);
    localStorage.setItem("listToggled", listToggled);
  }, [isToggled, listToggled]);

  return (
    <div>
      <button id="btn-menu" onClick={handleMenuClick}>
        {" "}
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="whitesmoke" className="bi bi-list" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
        </svg>
      </button>
    </div>
  );
};

export default MenuButton;
