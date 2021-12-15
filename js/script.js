// access to the input todo
let input = document.querySelector(".todo-input");

// access to the button save todo and listener click
let button = document.querySelector(".todo-button").addEventListener("click", addTodo);

// access to the filterTodo select tag
let filterTodo_select = document.querySelector(".filter-todo");

// access to the list todo
let todoList = document.querySelector(".todo-list");



// event istener for complete button and trash button
todoList.addEventListener("click", deleteAndCompleteTodo)

//filter todo list 
filterTodo_select.addEventListener("click", filterTodo)

//load todo when load page
document.addEventListener("DOMContentLoaded", loadTodo);


// when clicked save todo
function addTodo(e) {
    e.preventDefault();
    
    //make item todo list
    buildTodoList(input.value);
    

    // save to the local storage
    saveToLocal(input.value)
    input.value = "";

}

// make item todo list
function buildTodoList(element) {
    // make item and give class 
    let divTodo = document.createElement("div");
    divTodo.classList.add("todo");
    
    // make li (text todo) and give class
    let li = document.createElement("li");
    li.innerText = element;
    li.classList.add("todo-item");
    // append to the divTodo tag
    divTodo.appendChild(li);

    // make complete button and give class
    let completeBtn = document.createElement("button");
    completeBtn.classList.add("complete-btn");
    completeBtn.innerHTML = "<i class='fas fa-check'></i>";
    // append complete btn to the divTodo tag
    divTodo.appendChild(completeBtn);

    // make trash button and give class
    let trashBtn = document.createElement("button");
    trashBtn.classList.add("trash-btn");
    trashBtn.innerHTML = "<i class='fas fa-trash'></i>";
    // append trash btn to the divTodo tag
    divTodo.appendChild(trashBtn);

    // append item todo to todo list
    todoList.appendChild(divTodo);
}

//save to the local storage
function saveToLocal(todo) {
    let todos; 
    let item = JSON.parse(localStorage.getItem("todos"));

    if (item === null) {
        todos = [];
    }else {
        todos = item;
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

//load of the local storage
function loadTodo(e) {
    let todos; 
    let item = JSON.parse(localStorage.getItem("todos"));

    if (item === null) {
        todos = [];
    }else {
        todos = item;
    }
    for (const iterator of todos) {
        buildTodoList(iterator)
    }
}

// delete button and complete button
function deleteAndCompleteTodo(e) {
    let item = e.target;
    
    if (item.classList == "complete-btn") {
        item.parentElement.classList.toggle("completed")
    }
    if (item.classList == "trash-btn") {
        item.parentElement.remove();
        removeLocalTodo(item.parentElement.firstChild);
    }
}

// delet button of local storage
function removeLocalTodo(e) {
    let todos = JSON.parse(localStorage.getItem("todos"));
    if (todos.includes(e.innerHTML)) {
        todos.splice(todos.indexOf(e.innerHTML),1)
    }else{
        console.log(todos);
    }
    localStorage.setItem("todos",JSON.stringify(todos))
}
// filters todo list
function filterTodo(e) {
    let todos = todoList.childNodes;
    
    todos.forEach(todo => {
        // todo = item of todo list
        switch (e.target.value) {
            // if clicked all in seclet
            case "all":
                todo.style.display = "flex"
                break;

            // if clicked completed in seclet
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }else {
                    todo.style.display = "none";
                }
                break;

            // if clicked uncompleted in seclet
            case "uncompleted":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "none";
                }else {
                    todo.style.display = "flex";
                }
                break;
            default:
                break;
        } 
    });

}

