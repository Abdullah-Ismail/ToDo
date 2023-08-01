// ... (existing code) ...

// Add a new task when the "Add Task" button is clicked
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  const taskDatetime = datetimeInput.value.trim();

  if (taskText !== "" && taskDatetime !== "") {
    addTaskToList(taskText, taskDatetime);
    taskInput.value = "";
    datetimeInput.value = "";
  }
});

// ... (existing code) ...

// Add a new task to the list
function addTaskToList(taskText, taskDatetime) {
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  const taskLabel = document.createElement("span");
  const datetimeLabel = document.createElement("span");
  const deleteBtn = document.createElement("button");

  checkbox.type = "checkbox";
  taskLabel.textContent = taskText;
  datetimeLabel.textContent = taskDatetime;
  deleteBtn.textContent = "Delete";

  li.appendChild(checkbox);
  li.appendChild(taskLabel);
  li.appendChild(datetimeLabel);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  // Event listener to handle task deletion
  deleteBtn.addEventListener("click", () => {
    taskList.removeChild(li);
    updateLocalStorage();
  });

  // Event listener to handle task completion
  checkbox.addEventListener("change", () => {
    li.classList.toggle("completed");
    updateLocalStorage();
  });

  // Set the alarm if the task has a specified time
  const currentTime = new Date();
  const taskTime = new Date(taskDatetime);
  if (taskTime > currentTime) {
    const timeDifference = taskTime.getTime() - currentTime.getTime();
    setTimeout(() => {
      handleAlarm(li);
    }, timeDifference);
  }

  updateLocalStorage();
}

// Function to handle the alarm
function handleAlarm(taskElement) {
  // Play an alert sound to indicate the alarm
  const alertSound = new Audio('.vscode\bing-bong-subway-chime-jam-fx-1-00-03.mp3');
  alertSound.play();

  // Show an alert with the task information
  const taskText = taskElement.querySelector('span').textContent;
  const taskDatetime = taskElement.querySelector('span.datetime').textContent;
  alert(`Alarm for task: "${taskText}" at ${taskDatetime}`);

  // Modify the task appearance to indicate the alarm is ringing
  taskElement.classList.add("alarm");
}
