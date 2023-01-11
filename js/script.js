document.querySelector("form").addEventListener("submit", e => {
      e.preventDefault();
      addTask();
});

const todoInput = document.getElementById("todoInput");

function addElement() {
    const task = document.querySelector(".todoInput");
    const list = document.querySelector("ul");

    if(task.value==''){
        alert('Please enter something!');
        task.value.parentElement.remove();
    }

    const li = document.createElement("li");
    li.innerHTML = `<div class="left"><input type="checkbox" class="check" onclick="taskComplete(this)">
    <input type="text" value="${task.value}" id="task" class="${completed ? "completed" : "task"}"></div>
    <i class="fa fa-trash" style="color: red;" onclick="remove(this)"></i>`;
    list.appendChild(li);

    task.value = "";
}
var completed = false;

function remove(event) {
    event.parentElement.remove();
}

document.addEventListener('keyup', keypress);
function keypress(e){
    e.preventDefault()
    if (e.key === 'Enter' || e.keyCode === 13) {
        addElement();
    }
}