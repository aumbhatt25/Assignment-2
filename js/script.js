const todoForm = document.querySelector('.todoForm');
const todoInput = document.querySelector('.todoInput');
const todoList = document.querySelector('.list');

let toDos=[];

todoForm.addEventListener('submit', function(event){
    event.preventDefault();

    addElement(todoInput.value  );
})

function addElement(item){
    if(item!==''){
        const todoitem = {
            id: Date.now(),
            name: item,
            completed: false
        }
    }
    toDos.push(todoitem);
    todoInput.value='';
}

function rendering(toDos){

}