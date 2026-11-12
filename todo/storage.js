const TASKS_KEY = "todo-app.tasks";
const FILTER_KEY = "todo-app.filter";

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

export function loadFilter() {
  const savedFilter = localStorage.getItem(FILTER_KEY);
  const filters = ["all", "active", "completed"];

  if (filters.includes(savedFilter)) {
    return savedFilter;
  }

  return "all";
}

export function saveFilter(filter) {
  localStorage.setItem(FILTER_KEY, filter);
}
