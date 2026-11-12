const TASKS_KEY = "todo-app.tasks";

export function loadTasks() {
  const savedTasks = localStorage.getItem(TASKS_KEY);

  if (!savedTasks) {
    return [];
  }

  try {
    return JSON.parse(savedTasks);
  } catch {
    return [];
  }
}

export function saveTasks(tasks) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}
