import React from "react";

function List() {
  return (
    <>
      <div className="taskform">
        <form id="myForm">
          <div id="headingDay">
            <h2 className="myDay">My Day</h2>
          </div>
          <div className="baseAdd">
            <button className="baseAdd-icon addTask" type="button" aria-label="Add a task" tabIndex="0">
              <svg className="fluentIcon ___12fm75w f1w7gpdv fez10in fg4l7m0" fill="currentColor" aria-hidden="true" width="20" height="30" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 3a7 7 0 100 14 7 7 0 000-14zm-8 7a8 8 0 1116 0 8 8 0 01-16 0z" fill="currentColor"></path>
              </svg>
            </button>
            <input id="baseAddInput-addTask-today" className="baseAdd-input taskCreation expanded" aria-label="List My Day, Press shift+tab to access List options" aria-describedby="baseAddInput-addTask-description" type="text" maxLength="255" placeholder="Add a task" tabIndex="0" autoComplete="off"></input>
          </div>
        </form>
      </div>
    </>
  );
}

export default List;
