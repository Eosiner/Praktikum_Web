let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    todos.forEach((todo, index) => {
        const todoItem = document.createElement('div');
        todoItem.className = 'todo-item';

        if (todo.isEditing) {
            todoItem.innerHTML = `
                <input type="text" class="todo-text" value="${todo.text}">
                <div class="todo-actions">
                    <button onclick="saveTodoEdit(${index})">Save</button>
                    <button class="delete-btn" onclick="cancelEdit(${index})">Cancel</button>
                </div>
            `;
        } else {
            todoItem.innerHTML = `
                <div class="todo-text">${todo.text}</div>
                <div class="todo-actions">
                    <img class="edit-btn" src="https://img.icons8.com/fluency/48/edit.png" alt="Edit" onclick="editTodo(${index})">
                    <img class="delete-btn" src="https://img.icons8.com/color/48/delete.png" alt="Delete" onclick="deleteTodo(${index})">
                </div>
            `;
        }

        todoList.appendChild(todoItem);
    });
}

function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();

    if (text) {
        todos.push({
            text: text,
            isEditing: false
        });
        saveTodos();
        input.value = '';
        renderTodos();
    }
}

function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

function editTodo(index) {
    todos[index].isEditing = true;
    renderTodos();
}

function saveTodoEdit(index) {
    const todoItem = document.querySelectorAll('.todo-item')[index];
    const input = todoItem.querySelector('input');
    const text = input.value.trim();

    if (text) {
        todos[index].text = text;
        todos[index].isEditing = false;
        saveTodos();
        renderTodos();
    }
}

function cancelEdit(index) {
    todos[index].isEditing = false;
    renderTodos();
}

document.addEventListener('DOMContentLoaded', renderTodos);

document.getElementById('todoInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});
