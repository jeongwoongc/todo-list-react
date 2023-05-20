import React, { useEffect, useState } from "react";

function List() {
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    if (!inputValue) return;
    e.preventDefault();
    setList([inputValue, ...list]);
    setInputValue("");
  }

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
  



  return (
    <div className="taskform">
      <form id="myForm" onSubmit={handleSubmit}>
        <div id="headingDay">
          <h2 className="myDay">My Day</h2>
        </div>
        <div className="baseAdd">
          <button className="baseAdd-icon addTask" type="button" aria-label="Add a task" tabIndex="0">
            <svg className="fluentIcon ___12fm75w f1w7gpdv fez10in fg4l7m0" fill="currentColor" aria-hidden="true" width="20" height="30" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 3a7 7 0 100 14 7 7 0 000-14zm-8 7a8 8 0 1116 0 8 8 0 01-16 0z" fill="currentColor"></path>
            </svg>
          </button>
          <input id="baseAddInput-addTask-today" aria-label="List My Day, Press shift+tab to access List options" aria-describedby="baseAddInput-addTask-description" value={inputValue} onChange={handleChange} type="text" maxLength="255" placeholder="Add a task" tabIndex="0" autoComplete="off"></input>
        </div>
        <div className="addedTask">
          <ul className="lTask">
            {list.map((item, index) => (
              <li key={index} className="iTask">
                {" "}
                <button className="baseAdd-icon addTask" type="button" aria-label="Add a task" tabIndex="0" onClick={() => handleComplete(index)}>
                  <svg className="fluentIcon ___12fm75w f1w7gpdv fez10in fg4l7m0" fill="currentColor" aria-hidden="true" width="20" height="30" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 3a7 7 0 100 14 7 7 0 000-14zm-8 7a8 8 0 1116 0 8 8 0 01-16 0z" fill="currentColor"></path>
                  </svg>
                </button>
                {item}
              </li>
            ))}
          </ul>
          {showCompleted && (
            <ul className="lTask">
              <h2>Completed</h2>
              {completedList.map((item, index) => (
                <li key={index} className="iTask">
                  {" "}
                  <button className="baseAdd-icon addTask" type="button" aria-label="Add a task" tabIndex="0" onClick={() => handleCompleted(index)}>
                    <svg class="fluentIcon ___12fm75w f1w7gpdv fez10in fg4l7m0" fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" focusable="false"><path d="M10 2a8 8 0 110 16 8 8 0 010-16zm3.36 5.65a.5.5 0 00-.64-.06l-.07.06L9 11.3 7.35 9.65l-.07-.06a.5.5 0 00-.7.7l.07.07 2 2 .07.06c.17.11.4.11.56 0l.07-.06 4-4 .07-.08a.5.5 0 00-.06-.63z" fill="currentColor"></path></svg>
                  </button>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>
    </div>
  );
}

export default List;
