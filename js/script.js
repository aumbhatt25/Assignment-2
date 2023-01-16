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

    const list = document.querySelector('.list');

    array.forEach(function(todo){

        const item = document.querySelector(`[data-key='${todo.id}']`);

        const isChecked = todo.checked ? 'done' : '';
        const li = document.createElement("li");
        li.setAttribute('class', `todoClass ${isChecked}`);

        li.setAttribute('data-key', todo.id);

        li.innerHTML = `<div class="left"><input type="checkbox" id="${todo.id}" name="checkbox" class="check" onclick="checkingCheckBox(${todo.id})">
        <span id="${todo.id}" class="unchecked"> - </span>
        <span id="${todo.id}" class="checked"> &#10003 </span>
        <label id="${todo.id}" class="task">${todo.name}</label></div>
        <i class="fa fa-trash delete" onclick="deleteTodo(${todo.id})" style="color: red;"></i>`;

        if (item) {
            list.replaceChild(li, item);
          } else {
            list.append(li);
          }
    });
}

    // let myList = document.querySelector('ul')
//     document.addEventListener('click', function deleteHandler(event){
//     var hasClass = event.target.matches('.delete');
//     if(hasClass){
//         const itemKey = event.target.parentElement.dataset.key;
//         deleteTodo(itemKey);
//     }
// })

// function deleteTodo(key) {
    // 
    // let stored = localStorage.getItem("todoRef");
    // toDos = JSON.parse(stored);

    // const index = toDos.findIndex(item => item.id === Number(key));
    
    // const todo = {
    //   deleted: true,
    //   ...toDos[index]
    // };
    
    // toDos = toDos.filter(item => item.id !== Number(key));
    // localStorage.setItem("todoRef", JSON.stringify(toDos));
    
    // const item = document.querySelector(`[data-key='${todo.id}']`);

    // if (todo.deleted) {
    //     item.remove();
    //     return;
    //   }
//   }

function deleteTodo(id){
    const ref = localStorage.getItem('todoRef');
    console.log(ref);
    let tempArr = JSON.parse(ref);
      
    tempArr = tempArr.filter(item => item.id !== Number(id));
    console.log(id);
    localStorage.setItem("todoRef", JSON.stringify(tempArr));
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
window.addEventListener('change', save);

document.addEventListener('DOMContentLoaded', () => {
    const ref = localStorage.getItem('todoRef');
    if (ref) {
        toDos = JSON.parse(ref);
        showTodo(toDos);
    }
  });