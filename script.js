const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".task-filters button");

let tasks = [];

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

window.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  const newTask = { text, completed: false };
  tasks.push(newTask);
  saveTasks();
  renderTask(newTask);

  taskInput.value = "";
  taskInput.focus();
}

function renderTask(task, index = tasks.length - 1) {
  const taskItem = document.createElement("div");
  taskItem.classList.add("task-item");
  if (task.completed) taskItem.classList.add("completed");

  const taskText = document.createElement("span");
  taskText.classList.add("task-text");
  taskText.textContent = task.text;
  taskText.addEventListener("click", () => {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    taskItem.classList.toggle("completed");
  });

  const actions = document.createElement("div");
  actions.classList.add("task-actions");

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "🗑️";
  deleteBtn.title = "Eliminar";
  deleteBtn.addEventListener("click", () => {
    taskItem.classList.add("deleting");

    setTimeout(() => {
      tasks.splice(index, 1);
      saveTasks();
      taskItem.remove();
    }, 400);
  });

  actions.appendChild(deleteBtn);
  taskItem.appendChild(taskText);
  taskItem.appendChild(actions);

  taskList.appendChild(taskItem);
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  taskList.innerHTML = "";
  const stored = localStorage.getItem("tasks");
  tasks = stored ? JSON.parse(stored) : [];
  tasks.forEach((task, i) => renderTask(task, i));
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    filterTasks(button.dataset.filter);
  });
});

function filterTasks(type) {
  const items = document.querySelectorAll(".task-item");

  items.forEach((item, i) => {
    const isCompleted = tasks[i]?.completed;
    const shouldShow =
      type === "all" ||
      (type === "active" && !isCompleted) ||
      (type === "completed" && isCompleted);

    if (shouldShow) {
      item.classList.remove("hidden");
    } else {
      item.classList.add("hidden");
    }
  });
}
