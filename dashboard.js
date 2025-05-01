const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const displayWeekDay = document.getElementById("day");
const displayDayNb = document.getElementById("number");
const displayMonth = document.getElementById("month");

const day = new Date();
displayWeekDay.innerHTML = weekday[day.getDay()];
displayDayNb.innerHTML = day.getDate();
displayMonth.innerHTML = month[day.getMonth()];

const addTaskBtn = document.getElementById("add-btn");
const inputTask = document.getElementById("write-task");
const taskListContainer = document.getElementById("task-list");
const progressBarValue = document.getElementById("progress-bar");
const finishBtn = document.getElementById("finish-btn");

let taskList = [];

addTaskBtn.addEventListener("click", () => {
  const taskText = inputTask.value.trim();
  if (taskText === "") {
    console.warn("Please enter a task before adding to the list.");
    return;
  }

  const task = { text: taskText, done: false };
  taskList.push(task);
  inputTask.value = "";

  renderTaskList();
  updateProgressBar();
});

function renderTaskList() {
  taskListContainer.innerHTML = "";

  taskList.forEach((task, index) => {
    const p = document.createElement("p");
    p.innerHTML = `<i class='bx bxs-leaf'></i> <span class="${
      task.done ? "checked done" : ""
    }">${task.text}</span>`;

    p.querySelector("span").addEventListener("click", () => {
      task.done = !task.done;
      renderTaskList();
      updateProgressBar();
    });

    taskListContainer.appendChild(p);
  });
}

function updateProgressBar() {
  if (taskList.length === 0) {
    progressBarValue.value = 0;
    return;
  }

  const completedTasks = taskList.filter((task) => task.done).length;
  const progress = (completedTasks / taskList.length) * 100;
  progressBarValue.value = progress;
}

finishBtn.addEventListener("click", () => {
  console.log("Saving progress:", progressBarValue.value);
  localStorage.setItem("finalProgress", progressBarValue.value);
  window.location.href = "finishDay.html";
});
