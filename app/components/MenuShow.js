document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#myForm");
  const sidebar = document.querySelector(".sidebar");
  const taskform = document.querySelector(".taskform");

  const isToggled = localStorage.getItem("isToggled") === "true";
  const listToggled = localStorage.getItem("listToggled") === "true";

  if (isToggled && listToggled) {
    sidebar.classList.add("showinstant");
    taskform.classList.add("move");
  }

  document.querySelector("#btn-menu").onclick = function () {
    sidebar.classList.toggle("showinstant");
    taskform.classList.toggle("move");
    localStorage.setItem("isToggled", sidebar.classList.contains("showinstant"));
    localStorage.setItem("listToggled", taskform.classList.contains("move"));
  };

  form.addEventListener("submit", event => {
    event.preventDefault(); // prevent default form submission behavior
    const input = document.querySelector("#baseAddInput-addTask-today");
    const value = input.value;
    console.log(value);
    input.value = ""; // clear the input field after submission
  });
});
