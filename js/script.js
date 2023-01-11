document.querySelector("form").addEventListener("submit", e => {
      e.preventDefault();
      addTask();
});
var completed = false;
const todoInput = document.getElementById("todoInput");

function addElement() {
    const task = document.querySelector(".todoInput");
    const list = document.querySelector("ul");

    if(task.value==''){
        alert('Please enter something!');
        task.value.parentElement.remove();
    }

    const li = document.createElement("li");
    li.innerHTML = `<div class="left"><input type="checkbox" id="checkbox" name="checkbox" class="check">
    <label id="task" class="task">${task.value}</label></div>
    <i class="fa fa-trash" style="color: red;" onclick="remove(this)"></i>`;
    list.appendChild(li);
    document.getElementById("todoInput").value='';

    var textbox = document.getElementById("task");
    var checkbox = document.querySelector("input[name='checkbox']");
    $('#checkbox').change(function() {
        if (this.checked) {
            completed=!completed;
        }
    });

    task.value = "";
    
}

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