import React, { useEffect, useState, useRef, useContext } from "react";
import DateTimeDisplay from "./DateTime";
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://localhost:8000"
});

function List(props) {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [list, setList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [frontList, setFrontList] = useState([]);
  const [importantList, setimportantList] = useState([]);
  const inputRef = useRef(null);

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!inputValue) return;
    setInputValue("");
    setEditIndex(-1);
    // when the item is added, send the current state of the item list to backend with axios
    try {
      await client.get("/api/user").then(response => {
        console.log(response.data.user);
        client
          .post("/api/todo", {
            item: inputValue,
            completed: false,
            important: false,
            user: response.data.user.user_id
          })
          .then(function (res) {
            client.get("api/todo").then(function (res) {
              // extract the items from the response dictionary and map them to a list
              console.log(res.data.map(item => item["item"]));
              appDispatch({ type: "loadItems", data: res.data.map(item => item["item"]) });
            });
          });
      });
      setList([inputValue, ...list]);
      setFrontList([inputValue, ...list]);
    } catch (e) {
      console.log(e);
    }
  }

  async function fetchItems() {
    await client.get("/api/todo").then(response => {
      const data = response.data;
      const userItemsList = data.map(item => item.item);
      const completedItemsList = data.filter(item => item.completed === true).map(item => item.item);
      const importantItemsList = data.filter(item => item.important === true).map(item => item.item);
      setList(userItemsList);
      setCompletedList(completedItemsList);
      setimportantList(importantItemsList);
    });
  }

  const handleKeyDown = e => {
    if (e.key === "Enter" && inputValue.trim() === "") {
      e.preventDefault();
      return;
    }
  };

  async function handleComplete(index, item) {
    const updatedActiveList = list.filter(activeItem => activeItem !== item);

    setCompletedList([...completedList, item]);
    setFrontList(updatedActiveList);

    localStorage.setItem("list", JSON.stringify(updatedActiveList));
    localStorage.setItem("completedList", JSON.stringify([...completedList, item]));

    try {
      client.get("/api/todo").then(response => {
        const backendIndex = response.data[index].id;
        console.log(backendIndex);
        console.log(response.data);
        client.patch(`/api/todo/${backendIndex}/`, {
          completed: true
        });
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function handleCompleted(index, item) {
    const updatedCompletedList = completedList.filter(completedItem => completedItem !== item);

    setFrontList([...list, item]);
    setCompletedList(updatedCompletedList);

    localStorage.setItem("list", JSON.stringify([...list, item]));
    localStorage.setItem("completedList", JSON.stringify(updatedCompletedList));

    try {
      client.get("/api/todo").then(response => {
        const backendIndex = response.data[index].id;
        console.log(backendIndex);
        console.log(response.data);
        client.patch(`/api/todo/${backendIndex}/`, {
          completed: false
        });
      });
    } catch (e) {
      console.log(e);
    }
  }

  const handleEdit = index => {
    if (editIndex === -1) {
      setEditIndex(index);
    }
  };

async function handleDeleteItem (index, item) {
    const itemIndex = list.indexOf(item);
    const newList = [...list];
    const updatedList = completedList.filter(listItem => listItem !== item);
    newList.splice(itemIndex, 1);
    completedList.splice(itemIndex, 1);
    setCompletedList(updatedList);
    setList(newList);
    
    console.log(index);

    try {
      await client.get("/api/todo").then(response => {
        const backendIndex = response.data[itemIndex].id;
        console.log(backendIndex);
        console.log(response.data);
        client.delete(`/api/todo/${backendIndex}/`);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleEditChange = (e, index) => {
    e.preventDefault();
    const newList = [...list];
    const newCompletedList = [...completedList];
    newCompletedList[index] = e.target.value;
    newList[index] = e.target.value;
    setList(newList);
  };

  const handleSave = (e, index) => {
    setEditIndex(-1);
    try {
      client.get("/api/todo").then(response => {
        const backendIndex = response.data[index].id;
        console.log(backendIndex);
        console.log(response.data);
        client.patch(`/api/todo/${backendIndex}/`, {
          item: e.target.value,
          completed: false
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.key === "Enter") {
      handleSave(e, index);
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
    const storedActiveList = JSON.parse(localStorage.getItem("frontList"));
    const storedCompletedList = JSON.parse(localStorage.getItem("completedList"));

    if (storedActiveList) {
      setFrontList(storedActiveList);
    }

    if (storedCompletedList) {
      setCompletedList(storedCompletedList);
    }
  }, []);

  // get the data from backend and set the list state

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  });

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

  useEffect(() => {
    if (completedList.length === list.length && list.length !== 0) {
      appDispatch({ type: "flashMessage", value: "You finished all your tasks!" });
    }
  }, [completedList, list]);

  return (
    <div className="mainSection">
      <form className="myForm" onSubmit={handleSubmit}>
        <div className="headingDay">
          <h2 className="myDay">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#fffffe" className="bi bi-sun" viewBox="0 0 16 16">
              <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
            </svg>{" "}
            <a className="usernametxt">My Day</a>
          </h2>
          <DateTimeDisplay />
          <div className="baseAdd">
            <button className="baseAdd-icon addTask" type="button" aria-label="Add a task" tabIndex="0">
              <svg className="fluentIcon ___12fm75w f1w7gpdv fez10in fg4l7m0" fill="#7f5af0" aria-hidden="true" width="20" height="30" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" >
                <path d="M10 3a7 7 0 100 14 7 7 0 000-14zm-8 7a8 8 0 1116 0 8 8 0 01-16 0z" fill="#7f5af0"></path>
              </svg>
            </button>
            <input id="baseAddInput-addTask-today" aria-label="List My Day, Press shift+tab to access List options" aria-describedby="baseAddInput-addTask-description" value={inputValue} ref={inputRef} onKeyDown={handleKeyDown} onChange={handleChange} type="text" maxLength="255" placeholder="Add a task" autoComplete="off" autoFocus></input>
          </div>
        </div>
        <div className="taskform move">
          <div className="addedTask">
            <ul className="lTask">
              {list.map((item, index) => (
                <li key={index} className={`${completedList.includes(item) ? "iTaskCompleted" : "iTask"}`}>
                  <button className="baseAdd-icon addTask" type="button" aria-label="Add a task" tabIndex="0" onClick={completedList.includes(item) ? () => handleCompleted(index, item) : () => handleComplete(index, item)}>
                    <svg className="fluentIcon ___12fm75w f1w7gpdv fez10in fg4l7m0" fill="#fffffe" aria-hidden="true" width="20" height="30" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 3a7 7 0 100 14 7 7 0 000-14zm-8 7a8 8 0 1116 0 8 8 0 01-16 0z" fill="#7f5af0"></path>
                      <path className="check" d="M10 2a8 8 0 110 16 8 8 0 010-16zm3.36 5.65a.5.5 0 00-.64-.06l-.07.06L9 11.3 7.35 9.65l-.07-.06a.5.5 0 00-.7.7l.07.07 2 2 .07.06c.17.11.4.11.56 0l.07-.06 4-4 .07-.08a.5.5 0 00-.06-.63z" fill="#7f5af0"></path>
                    </svg>
                  </button>{" "}
                  {editIndex === index ? <input className="taskEditInput" type="text" value={item} onChange={e => handleEditChange(e, index)} onBlur={e => handleSave(e, index)} onKeyDown={e => handleKeyPress(e, index)} autoFocus /> : <span>{item}</span>}
                  {completedList.includes(item) ? (
                    <div className="buttonContainer"></div>
                  ) : (
                    <div className="buttonContainer">
                      <div className="buttonContainer">
                        <button className="taskEdit" onClick={() => handleEdit(index)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#7f5af0" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" fill="#fffffe"/>
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" fill="#fffffe"/>
                          </svg>
                        </button>
                        <button className="taskDelete" onClick={() => handleDeleteItem(index, item)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#7f5af0" className="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" fill="#fffffe"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" fill="#fffffe"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
}

export default List;
