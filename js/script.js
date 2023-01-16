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
    document.addEventListener('keyup', keypress);
    function keypress(e){
        e.preventDefault()
        if (e.key === 'Enter' || e.keyCode === 13) {
            addToDo(text);
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
    showTodo(toDos);
    localStorage.setItem('todoRef', JSON.stringify(toDos));
}

function showTodo(toDos){

    const list = document.querySelector('.list');


    toDos.forEach(function(todo){

        const isChecked = todo.checked ? 'done' : '';
        const li = document.createElement("li");
        li.setAttribute('class', `todoClass`);

        li.setAttribute('data-key', todo.id);

        if(todo.checked == true){
            li.classList.add('checked');
        }

        li.innerHTML = `<div class="left"><input type="checkbox" id="${todo.id}" name="checkbox" class="check" onclick="checkingCheckBox(${todo.id})">
        <span id="${todo.id}" class="unchecked"> - </span>
        <span id="${todo.id}" class="checked"> &#10003 </span>
        <label id="${todo.id}" class="task">${todo.name}</label></div>
        <i class="fa fa-trash delete" style="color: red;"></i>`;

        list.append(li);
    });
}

    // let myList = document.querySelector('ul')
    document.addEventListener('click', function deleteHandler(event){
    var hasClass = event.target.matches('.delete');
    if(hasClass){
        const itemKey = event.target.parentElement.dataset.key;
        deleteTodo(itemKey);
    }
})

function deleteTodo(key) {
    
    let stored = localStorage.getItem("todoRef");
    toDos = JSON.parse(stored);

    const index = toDos.findIndex(item => item.id === Number(key));
    
    const todo = {
      deleted: true,
      ...toDos[index]
    };
    
    toDos = toDos.filter(item => item.id !== Number(key));
    localStorage.setItem("todoRef", JSON.stringify(toDos));
    
    const item = document.querySelector(`[data-key='${todo.id}']`);

    if (todo.deleted) {
        item.remove();
        return;
      }
  }

const todoInput = document.getElementById("todoInput");

todoInput.addEventListener('input',function(){
    let searchInput= todoInput.value.toLowerCase();

    let lbl=document.getElementsByTagName('li');

    Array.from(lbl).forEach(function(task){
        let taskTxt = task.getElementsByTagName("label")[0].innerHTML;

        if(taskTxt.toLowerCase().includes(searchInput)){
            task.style.display = "flex";
        }else{
            task.style.display = "none";
        }
    })
})

function checkingCheckBox(id){
    const ref = localStorage.getItem('todoRef');
    const tempArr = JSON.parse(ref);
    tempArr.forEach(function(item){
        if(item.id==id){
            item.checked=!item.checked;
        }
    })

    localStorage.setItem("todoRef", JSON.stringify(tempArr));
}

document.addEventListener('DOMContentLoaded', () => {
    const ref = localStorage.getItem('todoRef');
    const tempArr = JSON.parse(ref);
    if (ref) {
      toDos = JSON.parse(ref);
      showTodo(tempArr);
    }
  });
  