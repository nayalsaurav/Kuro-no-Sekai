let addBtn = document.querySelector("#add-task-button");
let taskInput = document.querySelector("#task-input");
let taskList = document.querySelector("#task-lists");

addBtn.addEventListener('click',()=>{
    let data = taskInput.value;
    createData(data);
    taskInput.value = "";
})


function createData(data) {
    let newTask = document.createElement('li');
    data = data.trim();
    if(data!==""){
        newTask.innerHTML = `
        <li class="task">
              <div class="flex">
                <input type="checkbox" name="task" class="check" />
                <span class="task-content">${data}</span>
              </div>
              <div class="flex">
                <span class="material-symbols-outlined edit-button btn"> edit_square </span>
                <span class="material-symbols-outlined delete-button btn"> delete </span>
              </div>
            </li>
            `;
            taskInput.value = "";
            taskList.appendChild(newTask);
            updateData(newTask);
            deleteData(newTask);
    }
}

function readData(data) {
    
}
function updateData(taskItem) {
  let editButton = taskItem.querySelector(".edit-button");
  let taskContent = taskItem.querySelector(".task-content");

  editButton.addEventListener("click", () => {
    let newTaskData = prompt("Edit your task:", taskContent.textContent);
    if (newTaskData && newTaskData.trim() !== "") {
      taskContent.textContent = newTaskData.trim();
    }
  });
}
function deleteData(taskItem) {
     let deleteButton = taskItem.querySelector(".delete-button");

     deleteButton.addEventListener("click", () => {
       taskList.removeChild(taskItem);
     });
}