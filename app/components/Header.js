import React from "react";

function Header() {
  return (
    <>
      <header>
        <div className="header-div">
        <button id="btn-menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="whitesmoke" className="bi bi-list" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
          </svg>
        </button>
          <a className="todo-a" href="">
            To Do
          </a>
          <form className="search-bar">
            <input id="search" type="text" name="search" placeholder="Search"></input>
          </form>
          <button id="btn-profile" type="button" className="btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="whitesmoke" className="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
            </svg>
          </button>
        </div>
      </header>
    </>
  );
}

export default Header;
