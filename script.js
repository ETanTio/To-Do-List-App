let tasks = [
  { id: 1, title: "BPM Project", status: "ToDo" },
  { id: 2, title: "Room Assignment System", status: "ToDo" },
  { id: 3, title: "Write Code", status: "Done" },
  { id: 4, title: "PEE Infographics", status: "ToDo" },
  { id: 5, title: "Learn JavaScript", status: "InProgress" },
  { id: 6, title: "PEE Film", status: "ToDo" },
  { id: 7, title: "Subnetting Activities", status: "ToDo" },
  { id: 8, title: "To-Do List App Assignment", status: "Done" },
  { id: 9, title: "TCW Assignment", status: "ToDo" }
];

let selectedTaskId = null;

function renderTasks() {
  document.getElementById("todo").innerHTML = "<h2>To Do</h2>";
  document.getElementById("inprogress").innerHTML = "<h2>In Progress</h2>";
  document.getElementById("done").innerHTML = "<h2>Done</h2>";

  tasks.forEach(task => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.textContent = task.title;

    if (task.status === "ToDo") {
      taskElement.classList.add("todo");
    } else if (task.status === "InProgress") {
      taskElement.classList.add("inprogress");
    } else if (task.status === "Done") {
      taskElement.classList.add("done");
    }

    if (task.id === selectedTaskId) {
      taskElement.classList.add("selected");
    }

    taskElement.addEventListener("click", () => {
      selectedTaskId = (selectedTaskId === task.id) ? null : task.id;
      updateSelectedDisplay();
      renderTasks();
    });

    if (task.status === "ToDo") {
      document.getElementById("todo").appendChild(taskElement);
    } else if (task.status === "InProgress") {
      document.getElementById("inprogress").appendChild(taskElement);
    } else if (task.status === "Done") {
      document.getElementById("done").appendChild(taskElement);
    }
  });

  document.getElementById("todoCount").textContent =
    tasks.filter(task => task.status === "ToDo").length;
  document.getElementById("inprogressCount").textContent =
    tasks.filter(task => task.status === "InProgress").length;
  document.getElementById("doneCount").textContent =
    tasks.filter(task => task.status === "Done").length;
}

function updateSelectedDisplay() {
  const display = document.getElementById("selectedTaskDisplay");
  if (selectedTaskId === null) {
    display.textContent = "No task selected";
  } else {
    const task = tasks.find(t => t.id === selectedTaskId);
    display.textContent = "Selected: " + task.title;
  }
}

function updateSelectedTaskStatus(newStatus) {
  if (selectedTaskId === null) {
    alert("Please select a task first.");
    return;
  }

  const selectedTask = tasks.find(task => task.id === selectedTaskId);

  if (selectedTask && selectedTask.status === "Done" && newStatus === "Done") {
    tasks = tasks.filter(task => task.id !== selectedTaskId);
  } else {
    tasks = tasks.map(task => {
      if (task.id === selectedTaskId) {
        return { ...task, status: newStatus };
      }
      return task;
    });
  }
  selectedTaskId = null;
  updateSelectedDisplay();
  renderTasks();
}

function addTask() {
  const input = document.getElementById("newTaskInput");
  const title = input.value.trim();
  if (title === "") {
    alert("Please enter a task title.");
    return;
  }
  const newId = tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1;
  tasks.push({ id: newId, title: title, status: "ToDo" });
  input.value = "";
  renderTasks();
}

document.addEventListener("DOMContentLoaded", renderTasks);
