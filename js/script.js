let toDos = [];
const form = document.querySelector('form');

form.addEventListener('submit',event=>{
    event.preventDefault();

    const input = document.querySelector('.todoInput');
    const text = input.value;
    if(text!==''){
        addToDo(text);
        input.value = '';
    }
    if(document.addEventListener('keyup', keypress)){
    function keypress(e){
        e.preventDefault()
        if (e.key === 'Enter' || e.keyCode === 13) {
            addToDo(text);
        }
    }
    }
});

function addToDo(text){
    const todo = {
        name: text,
        checked: false,
        id: Date.now()
    };
    if(todo.name.value==''){
        todo.name.value.remove();
    }

    toDos.push(todo);
    console.log(toDos);

    localStorage.setItem('todoRef', JSON.stringify(toDos));
    showTodo(toDos);
}

function showTodo(array){

    const list = document.querySelector('#mylist');
    list.innerHTML='';
    console.log(list);

    array.forEach(function(todo, index){

        // const item = document.querySelector(`[data-key='${todo.id}']`);

        const isChecked = todo.checked ? 'done' : '';
        const li = document.createElement("li");
        li.setAttribute('class', `todoClass ${isChecked}`);

        li.setAttribute('data-key', todo.id);

        li.innerHTML = `<div class="left"><input type="checkbox" id="${todo.id}" ${isChecked ? 'checked' : ''} name="checkbox" class="check" onclick="checkingCheckBox(${index})">
        <span id="nonactive${index}" style="${isChecked ? "display: none" : "display: flex"};" class="unchecked"> - </span>
        <span id="active${index}" style="${isChecked ? "display: flex" : "display: none"};" class="checked"> &#10003 </span>
        <label id="${todo.id}" class="task">${todo.name}</label></div>
        <i class="fa fa-trash delete" onclick="deleteTodo(${todo.id})" style="color: red;"></i>`;

        list.append(li);
    });
}


function deleteTodo(id){
    let ref = localStorage.getItem('todoRef');
    console.log(ref);
    let tempArr = JSON.parse(ref);
      
    tempArr = tempArr.filter(item => item.id !== Number(id));
    localStorage.setItem("todoRef", JSON.stringify(tempArr));
    showTodo(tempArr);
}

const todoInput = document.getElementById("todoInput");

todoInput.addEventListener('input',function(){
    let searchInput= todoInput.value.toLowerCase();

    // let lbl=document.getElementsByTagName('li');

    let ref = localStorage.getItem('todoRef');
    // console.log(ref);
    toDos = JSON.parse(ref);
    let tempArr = [];

    toDos.forEach(function(task){
        let taskTxt = task.name;

        if(taskTxt.toLowerCase().includes(searchInput)){
            tempArr.push(task);
        }
    })
    showTodo(tempArr);
})

function checkingCheckBox(myIndex){
    const ref = localStorage.getItem('todoRef');
    let tempArr = JSON.parse(ref);
    tempArr.forEach(function(item, index){
        if(myIndex==index){
            item.checked=!item.checked;
        }
    })

    localStorage.setItem("todoRef", JSON.stringify(tempArr));
    showTodo(tempArr);
}

document.addEventListener('DOMContentLoaded', () => {
    const ref = localStorage.getItem('todoRef');
    if (ref) {
        toDos = JSON.parse(ref);
        showTodo(toDos);
    }
  });