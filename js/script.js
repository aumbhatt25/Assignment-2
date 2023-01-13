let toDos = [];

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
    showTodo(todo);
}

const form = document.querySelector('form');

form.addEventListener('submit',event=>{
    event.preventDefault();

    const input = document.querySelector('.todoInput');
    const text = input.value;
    if(text!==''){
        addToDo(text);
        input.value = '';
        input.focus();
    }
});

function showTodo(todo){

    const item = document.querySelector(`[data-key='${todo.id}']`);

    if (todo.deleted) {
        item.remove();
        return
      }

    localStorage.setItem('todoRef', JSON.stringify(toDos));
    const list = document.querySelector('.list');
    const isChecked = todo.checked ? 'done' : '';

    const li = document.createElement("li");
    li.setAttribute('class', `todoClass`);

    li.setAttribute('data-key', todo.id);

    li.innerHTML = `<div class="left"><input type="checkbox" id="${todo.id}" name="checkbox" class="check">
    <span id="${todo.id}" class="unchecked"> - </span>
    <span id="${todo.id}" class="checked"> &#10003 </span>
    <label id="${todo.id}" class="task">${todo.name}</label></div>
    <i class="fa fa-trash delete" style="color: red;"></i>`;

    list.append(li);
}

// function remove(event) {
//     let stored = localStorage.getItem("todoRef");
//     let toDos = JSON.parse(stored);
//     for(let i=0;i<toDos.length;i++){
//         if(event == toDos[i])
//         {
//             toDos.splice(i,1);
//         }
//     }
//     event.parentElement.remove();
//     localStorage.setItem("todoRef", JSON.stringify(toDos));
// }

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
    showTodo(todo);
  }

document.addEventListener('keyup', keypress);
function keypress(e){
    e.preventDefault()
    if (e.key === 'Enter' || e.keyCode === 13) {
        addElement();
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

document.addEventListener('DOMContentLoaded', () => {
    const ref = localStorage.getItem('todoRef');
    if (ref) {
      toDos = JSON.parse(ref);
      toDos.forEach(t => {
        showTodo(t);
      });
    }
  });
  