// Initialize the tasks array from localStorage or empty array if none exists
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to save tasks to localStorage
const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Function to add a new task
const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = ""; 
        updateTasksList();
        updateProgressBar();
        saveTasks();
    }
};

// Function to toggle task completion status
const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateProgressBar();
    saveTasks();
};

// Function to edit a task
const editTask = (index) => {
    const newText = prompt("Edit task:", tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        updateTasksList();
        saveTasks();
    }
};

// Function to delete a task
const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updateProgressBar();
    saveTasks();
};

// Function to update the tasks list in the UI
const updateTasksList = () => {
    const taskList = document.querySelector(".task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
            <div class="taskitem">
                <div class="task ${task.completed ? "completed" : ""}">
                    <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="./img/edit.png" class="edit-btn" alt="Edit" /> 
                    <img src="./img/bin.png" class="delete-btn" alt="Delete" />
                </div>
            </div>
        `;

        // Add event listeners
        listItem.querySelector(".checkbox").addEventListener("change", () => toggleTaskComplete(index));
        listItem.querySelector(".edit-btn").addEventListener("click", () => editTask(index));
        listItem.querySelector(".delete-btn").addEventListener("click", () => deleteTask(index));
        
        taskList.appendChild(listItem);
    });
};

// Function to update the progress bar and numbers
const updateProgressBar = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    
    const progressElement = document.getElementById("progress");
    const numbersElement = document.getElementById("numbers");
    
    // Calculate progress percentage
    const progressPercentage = total > 0 ? (completed / total) * 100 : 0;
    
    // Update progress bar width
    progressElement.style.width = `${progressPercentage}%`;
    
    // Update numbers text
    numbersElement.textContent = `${completed} / ${total}`;
};

// Event listener for the form submission
document.getElementById("newTask").addEventListener("click", function(e) {
    e.preventDefault();
    addTask();
});

// Event listener for the Enter key in the input field
document.getElementById("taskInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        addTask();
    }
});

// Initialize the UI when the page loads
document.addEventListener("DOMContentLoaded", () => {
    updateTasksList();
    updateProgressBar();
});

