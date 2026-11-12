export function createTask(title) {
  return {
    id: Date.now(),
    title,
    completed: false,
    createdAt: new Date().toISOString()
  };
}

export function toggleTask(tasks, id) {
  return tasks.map((task) => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });
}

export function removeTask(tasks, id) {
  return tasks.filter((task) => task.id !== id);
}

export function getVisibleTasks(tasks, filter) {
  if (filter === "active") {
    return tasks.filter((task) => !task.completed);
  }
  if (filter === "completed") {
    return tasks.filter((task) => task.completed);
  }
  return tasks;
}
