import React, { useEffect } from "react"

function Completed() {

  function handleCompleted(index) {
    const newList = [...list]
    newList.splice(index, 1)
    setList(newList)
  }

  function showCompleted(){
    const completed = document.getElementById("completed")
    completed.classList.toggle("showCompleted")
  }

  return (
    <>
      <div className="baseAdd">
        <button className="baseAdd-icon addTask" type="button" aria-label="Add a task" tabIndex="0"></button>
      </div>
    </>
  )
}

export default Completed