let addTaskInfo = document.querySelector('.new-task-window-btn');
let taskWindow = document.querySelector('.window');
let addBtn = document.querySelector("#add-task-button");
let taskInputTitle = document.querySelector('.content-heading');
let taskInputDescription = document.getElementById('content-description');
let taskList = document.getElementById('task-lists');

addTaskInfo.addEventListener('click', () => {
    taskWindow.classList.toggle('active');
});

addBtn.addEventListener('click', () => {
    let title = taskInputTitle.value.trim();
    let description = taskInputDescription.value.trim();

    if (title && description) {
        createData(title, description);
        taskInputTitle.value = "";
        taskInputDescription.value = "";
        taskWindow.classList.remove('active');
    } else {
        alert("Please enter both title and description.");
    }
});

// Create
function createData(title, description) {
  let newTask = document.createElement('li');
  newTask.innerHTML = `
      <div class="upper-part">
          <div>
              <h3 class="task-title">${title}</h3>
              <p class="task-description">${description}</p>
          </div>
          <div class="checked">
              <i class="fa-regular fa-circle-check" id = "check"></i>
          </div>
      </div>
      <div class="line"></div>
      <div class="lower-part">
          <div class="edit">
              <i class="fa-solid fa-pen-to-square"></i>
          </div>
          <div class="delete">
              <i class="fa-solid fa-trash-can"></i>
          </div>
      </div>
  `;

  taskList.appendChild(newTask);
  taskCompleted(newTask);
  updateData(newTask);
  deleteData(newTask);
}
// Update
function updateData(taskItem) {
  let editButton = taskItem.querySelector(".edit");
  let taskTitle = taskItem.querySelector(".task-title");
  let taskDescription = taskItem.querySelector(".task-description");

  editButton.addEventListener("click", () => {
      let newTitle = prompt("Edit your task title:", taskTitle.textContent);
      let newDescription = prompt("Edit your task description:", taskDescription.textContent);

      if (newTitle && newTitle.trim() !== "") {
          taskTitle.textContent = newTitle.trim();
      }
      if (newDescription && newDescription.trim() !== "") {
          taskDescription.textContent = newDescription.trim();
      }
  });
}

// Delete
function deleteData(taskItem) {
    let deleteButton = taskItem.querySelector(".delete");

    deleteButton.addEventListener("click", () => {
        taskList.removeChild(taskItem); // Remove
    });
}

function taskCompleted(taskItem) {
       let check = taskItem.querySelector("#check");
       let title = taskItem.querySelector(".task-title");
       check.addEventListener('click',()=>{
            check.classList.toggle('toggle-check');
            title.classList.toggle('line-through');
       })
}

// local storage
