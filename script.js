const categoryButtons = document.querySelectorAll('.category-button');

const removePrimaryClass = () => {
    categoryButtons.forEach((categoryButton) => {
        categoryButton.classList.remove('button--primary')
    })
}

categoryButtons.forEach((categoryButton) => {
    categoryButton.addEventListener('click', () => {
        if (categoryButton.classList.contains('all')) {
            removePrimaryClass();
            categoryButton.classList.add('button--primary');
            document.querySelectorAll('.todo-item').forEach((item) => item.classList.remove('hide'));

        } else if (categoryButton.classList.contains('active')) {
            removePrimaryClass();
            categoryButton.classList.add('button--primary');

            document.querySelectorAll('.todo-item').forEach((item) => item.classList.remove('hide'));
            document.querySelectorAll('.todo-item--done').forEach((item) => item.classList.add('hide'));
        } else if (categoryButton.classList.contains('done')) {
            removePrimaryClass();
            categoryButton.classList.add('button--primary');

            document.querySelectorAll('.todo-item').forEach((item) => item.classList.add('hide'));
            document.querySelectorAll('.todo-item--done').forEach((item) => item.classList.remove('hide'));
        }
    })
})


const showAddTodoButton = document.querySelector('.add-todo__show-form-button');
const closeButton = document.querySelector('.close-button');
const addTodo = document.querySelector('.add-todo__form');

const toggleAddTodoVisibility = () => {
    addTodo.classList.toggle('hide');
}

showAddTodoButton.addEventListener('click', toggleAddTodoVisibility);
closeButton.addEventListener('click', toggleAddTodoVisibility);

const todoList = document.querySelector('.todo-list');
const addTodoButton = document.querySelector('#add-todo--button');
const addTodoInput = document.querySelector('#add-todo--input');
const todoTemplate = document.querySelector('#template-item');
let todos = [];




addTodoButton.addEventListener('click', (e) => {
    e.preventDefault();
    createNewTodo(addTodoInput.value);
    addTodoInput.value = '';
})



const createNewTodo = (text) => {
    if (text.trim() !== '') {


        todos.push({
            id: todos.length >= 1 ? todos.length : 0,
            text: text,
            completed: false,

        })
        updateTodosDiv();
        countOfTodos();
    }
    localStorage.setItem('todos', JSON.stringify(todos));

}
const removeTodo = (removedTodoId) => {

    todos = todos.filter((todo) => todo.id !== removedTodoId);
    countOfTodos();
    localStorage.setItem('todos', JSON.stringify(todos));
}

const updateTodosDiv = () => {
    todoList.innerHTML = '';

    todos.forEach((todo) => {
        let newTodo = todoTemplate.cloneNode(true);

        newTodo.id = todo.id;
        newTodo.classList.add('todo-item');
        todo.completed === true && newTodo.classList.add('todo-item--done');
        newTodo.querySelector('.todo-item__text').textContent = todo.text;
        todoList.appendChild(newTodo);

    })
    addEventOnTodos()
}


const addEventOnTodos = () => {
    let allTodos = document.querySelectorAll('.todo-item');

    allTodos.forEach((item) => {
        item.addEventListener('click', () => {
            item.classList.toggle('todo-item--done');

            todos[parseInt(item.id)].completed = !todos[parseInt(item.id)].completed;
            localStorage.setItem('todos', JSON.stringify(todos));

            countOfTodos()
        })
        item.querySelector('.todo-item__remove-button').addEventListener(('click'), () => {

            removeTodo(parseInt(item.id));
            item.remove();
            countOfTodos()
        })
    })

}


const countOfTodos = () => {
    let counter = document.querySelector('.app-footer');
    let doneTodos = todos.filter((todo) => todo.completed === true);
    let moreTodos = todos.filter((todo) => todo.completed !== true);
    counter.textContent = `${moreTodos.length} more to do, ${doneTodos.length} done`
}

const storedTodos = localStorage.getItem('todos')

if (storedTodos) {
    try {
        const parsedTodos = JSON.parse(storedTodos);
        todos = parsedTodos;
        updateTodosDiv()
    } catch (error) {
        console.error('Error parsing todos:', error);
    }
}