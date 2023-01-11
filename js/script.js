const todoForm = document.querySelector('.todoForm');
const todoInput = document.querySelector('.todoInput');
const todoList = document.querySelector('.list');

let toDos=[];

todoForm.addEventListener('submit', function(event){
    event.preventDefault();

    addElement(todoInput.value);
})

function addElement(item){
    if(item!==''){
        toDos.push(todoitem);
    }
    
    todoInput.value='';
}

function rendering(toDos){
    todoList.innerHTML='';

    toDos.forEach(function(item){
        const checked = item.completed ? 'checked' : null;
    })

    //creating list
    const li = document.createElement('li');
    li.setAttribute('class','item');
}