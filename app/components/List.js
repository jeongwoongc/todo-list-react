import React, { useEffect, useState, useRef, useContext } from "react";
import DateTimeDisplay from "./DateTime";
import StateContext from "../StateContext";

function List() {
  const appState = useContext(StateContext);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [list, setList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const inputRef = useRef(null);

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!inputValue) return;
    setList([inputValue, ...list]);
    setInputValue("");
    setEditIndex(-1);
    // when the item is added, send the current state of the item list to backend with axios
    
  }

  const handleKeyDown = e => {
    if (e.key === "Enter" && inputValue.trim() === "") {
      e.preventDefault();
      return;
    }
  };

  const handleComplete = index => {
    const newList = [...list];
    setCompletedList([newList[index], ...completedList]);

    if (newList.length > 0) {
      setShowCompleted(true);
    } else {
      setShowCompleted(false);
    }

    newList.splice(index, 1);
    setList(newList);
  };

  const handleCompleted = index => {
    const newCompletedList = [...completedList];
    setList([newCompletedList[index], ...list]);
    newCompletedList.splice(index, 1);

    if (newCompletedList.length > 0) {
      setShowCompleted(true);
    } else {
      setShowCompleted(false);
    }

    setCompletedList(newCompletedList);
  };

  const handleEdit = index => {
    if (editIndex === -1) {
      setEditIndex(index);
    }
  };

  const handleDelete = index => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  };

  const handleDeleteCompleted = index => {
    index.preventDefault();
    const newCompletedList = [...completedList];
    newCompletedList.splice(index, 1);
    setCompletedList(newCompletedList);
  };

  const handleEditChange = (e, index) => {
    const newList = [...list];
    newList[index] = e.target.value;
    setList(newList);
  };

  const handleSave = () => {
    setEditIndex(-1);
  };

  const handleKeyPress = (e, index) => {
    if (e.key === "Enter") {
      handleSave();
      e.preventDefault();
    }
  };

  useEffect(() => {
    // Move focus setting logic here
    if (inputRef.current && inputValue === "") {
      inputRef.current.focus();
    }
  }, [inputValue]);

  useEffect(() => {
    const data = localStorage.getItem("list");
    if (data) {
      setList(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  });

  useEffect(() => {
    const data = localStorage.getItem("completedList");
    if (data) {
      setCompletedList(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("completedList", JSON.stringify(completedList));
  });

  useEffect(() => {
    if (completedList.length > 0) {
      setShowCompleted(true);
    } else {
      setShowCompleted(false);
    }
  }, [completedList]);

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
    <div className="mainSection">
      <form className="myForm" onSubmit={handleSubmit}>
        <div className="headingDay">
          <h2 className="myDay">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-sun" viewBox="0 0 16 16">
              <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
            </svg>{" "}
            <strong className="usernametxt">{appState.user.username}</strong>'s Day
          </h2>
          <DateTimeDisplay />
          <div className="baseAdd">
            <button className="baseAdd-icon addTask" type="button" aria-label="Add a task" tabIndex="0">
              <svg className="fluentIcon ___12fm75w f1w7gpdv fez10in fg4l7m0" fill="currentColor" aria-hidden="true" width="20" height="30" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 3a7 7 0 100 14 7 7 0 000-14zm-8 7a8 8 0 1116 0 8 8 0 01-16 0z" fill="currentColor"></path>
              </svg>
            </button>
            <input id="baseAddInput-addTask-today" aria-label="List My Day, Press shift+tab to access List options" aria-describedby="baseAddInput-addTask-description" value={inputValue} ref={inputRef} onKeyDown={handleKeyDown} onChange={handleChange} type="text" maxLength="255" placeholder="Add a task" autoComplete="off" autoFocus></input>
          </div>
        </div>
        <div className="taskform move">
          <div className="addedTask">
            <ul className="lTask">
              {list.map((item, index) => (
                <li key={index} className="iTask">
                  <button className="baseAdd-icon addTask" type="button" aria-label="Add a task" tabIndex="0" onClick={() => handleComplete(index)}>
                    <svg className="fluentIcon ___12fm75w f1w7gpdv fez10in fg4l7m0" fill="currentColor" aria-hidden="true" width="20" height="30" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 3a7 7 0 100 14 7 7 0 000-14zm-8 7a8 8 0 1116 0 8 8 0 01-16 0z" fill="currentColor"></path>
                      <path className="check" d="M10 2a8 8 0 110 16 8 8 0 010-16zm3.36 5.65a.5.5 0 00-.64-.06l-.07.06L9 11.3 7.35 9.65l-.07-.06a.5.5 0 00-.7.7l.07.07 2 2 .07.06c.17.11.4.11.56 0l.07-.06 4-4 .07-.08a.5.5 0 00-.06-.63z" fill="currentColor"></path>
                    </svg>
                  </button>{" "}
                  {editIndex === index ? <input className="taskEditInput" type="text" value={item} onChange={e => handleEditChange(e, index)} onBlur={handleSave} onKeyDown={e => handleKeyPress(e, index)} autoFocus /> : <span>{item}</span>}
                  <div className="buttonContainer">
                    <button className="taskEdit" onClick={() => handleEdit(index)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                      </svg>
                    </button>
                    <button className="taskDelete" onClick={handleDelete}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            {showCompleted && (
              <ul className="lTask">
                <h2 className="completed">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-check2-circle" viewBox="0 0 16 16">
                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                  </svg>{" "}
                  Completed
                </h2>
                {completedList.map((item, index) => (
                  <li key={index} className="iTaskCompleted">
                    {" "}
                    <button className="baseAdd-icon addTask" type="button" aria-label="Add a task" tabIndex="0" onClick={() => handleCompleted(index)}>
                      <svg className="fluentIcon ___12fm75w f1w7gpdv fez10in fg4l7m0" fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" focusable="false">
                        <path d="M10 2a8 8 0 110 16 8 8 0 010-16zm3.36 5.65a.5.5 0 00-.64-.06l-.07.06L9 11.3 7.35 9.65l-.07-.06a.5.5 0 00-.7.7l.07.07 2 2 .07.06c.17.11.4.11.56 0l.07-.06 4-4 .07-.08a.5.5 0 00-.06-.63z" fill="currentColor"></path>
                      </svg>
                    </button>
                    {item}
                    <div className="buttonContainer">
                      <button hidden></button>
                      <button className="taskDelete" onClick={handleDeleteCompleted}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default List;
