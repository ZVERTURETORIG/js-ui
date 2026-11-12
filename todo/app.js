import { createTask, getVisibleTasks, removeTask, toggleTask } from "./tasks.js";
import { loadTasks, saveTasks } from "./storage.js";

const taskForm = document.querySelector("#taskForm");
const taskInput = document.querySelector("#taskInput");
const filterSelect = document.querySelector("#filterSelect");
const taskList = document.querySelector("#taskList");
const emptyMessage = document.querySelector("#emptyMessage");

let tasks = loadTasks();
let filter = "all";

function render() {
  taskList.replaceChildren();
  const visibleTasks = getVisibleTasks(tasks, filter);
  emptyMessage.textContent = visibleTasks.length === 0 ? "Задач пока нет." : "";

  visibleTasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = task.completed ? "task completed" : "task";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", `Выполнено: ${task.title}`);
    checkbox.addEventListener("change", () => {
      tasks = toggleTask(tasks, task.id);
      saveTasks(tasks);
      render();
    });

    const title = document.createElement("span");
    title.className = "task-title";
    title.textContent = task.title;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "Удалить";
    deleteButton.addEventListener("click", () => {
      tasks = removeTask(tasks, task.id);
      saveTasks(tasks);
      render();
    });

    item.append(checkbox, title, deleteButton);
    taskList.append(item);
  });
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = taskInput.value.trim();

  if (title === "") {
    return;
  }

  tasks.push(createTask(title));
  saveTasks(tasks);
  taskInput.value = "";
  render();
});

filterSelect.addEventListener("change", () => {
  filter = filterSelect.value;
  render();
});

render();
