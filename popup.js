const addBtn = document.querySelector("button");
const newTask = document.querySelector("input");
const pendlist = document.querySelector(".pending-list");
const complist = document.querySelector(".complete-list");
// localStorage.clear()
let pendingList = JSON.parse(localStorage.getItem("pending"));
if (pendingList === null) {
  pendingList = [];
  localStorage.setItem("pending", JSON.stringify([]));
} else {
  pendingList.forEach((elem) => {
    let task = createNewPendingTask(elem);
    pendlist.appendChild(task);
  });
}
let completedList = JSON.parse(localStorage.getItem("completed"));
if (completedList === null) {
  completedList = [];
  localStorage.setItem("completed", JSON.stringify([]));
} else {
  completedList.forEach((elem) => {
    let task = createNewCompletedTask(elem);
    complist.appendChild(task);
  });
}

addBtn.addEventListener("click", (e) => {
  if (newTask.value === "") return;
  let task = createNewPendingTask(newTask.value);
  pendlist.appendChild(task);
  pendingList.push(newTask.value);
  localStorage.setItem("pending", JSON.stringify(pendingList));
  newTask.value = "";
});

function createNewPendingTask(str) {
  let taskDiv = document.createElement("div");
  taskDiv.classList.add("task");
  let taskName = document.createTextNode(str);
  taskDiv.appendChild(taskName);
  let delBtn = document.createElement("button");
  delBtn.innerText = "Del";
  delBtn.addEventListener("click", (e) => {
    completedList.push(str);
    let completeTask = createNewCompletedTask(str);
    complist.appendChild(completeTask);
    localStorage.setItem("completed", JSON.stringify(completedList));
    pendingList.splice(pendingList.indexOf(str), 1);
    localStorage.setItem("pending", JSON.stringify(pendingList));
    pendlist.removeChild(delBtn.parentNode);
  });
  taskDiv.appendChild(delBtn);
  return taskDiv;
}

function createNewCompletedTask(str) {
  let taskDiv = document.createElement("div");
  taskDiv.classList.add("task");
  let taskName = document.createTextNode(str);
  taskDiv.appendChild(taskName);
  return taskDiv;
}
