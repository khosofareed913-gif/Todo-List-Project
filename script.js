let input = document.querySelector(".create-todo-div #todo-input");
let btn = document.querySelector("#add-btn");
let todo_list_div = document.querySelector(".appendTodo-div");

const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved) : [];

const saveTodo = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
}


function createTodoNode(todo, index) {
    let todo_div = document.createElement("div");
    todo_div.classList.add("todo-div");

    let textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.classList.add("todo-text");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("todo-chkbox");
    checkbox.checked = !!todo.completed;
    textSpan.style.cssText = todo.completed ? "text-decoration :line-through; opacity: 0.5" : "text-decoration : none; opacity: 1";

    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;
        textSpan.style.cssText = todo.completed ? "text-decoration :line-through; opacity: 0.5" : "text-decoration : none; opacity: 1";
        saveTodo();
    })

    let editbtn = document.createElement("button");
    editbtn.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`;
    editbtn.classList.add("editTodo-btn")
    editbtn.addEventListener("click", () => {
        let todo_div = editbtn.parentElement;
        let textSpan = todo_div.querySelector(".todo-text");
        let newInput = document.createElement("input");
        newInput.classList.add("new-input")
        let tempValue = textSpan.textContent;
        newInput.value = tempValue;
        textSpan.replaceWith(newInput);
        newInput.focus();
        newInput.select();

        // disabling buttons and checkbox for editing todos
        checkbox.classList.add("opacity-low")
        checkbox.disabled = true;
        editbtn.classList.add("opacity-low");
        editbtn.disabled = true;
        delbtn.classList.add("opacity-low");
        delbtn.disabled = true;

        window.document.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                todo.completed = false;
                checkbox.checked = false;
                textSpan.style.cssText = "text-decoration: none; opacity: 1;";
                saveTodo()

                // enabling buttons and checkbox after editing
                checkbox.classList.remove("opacity-low")
                checkbox.disabled = false;
                editbtn.classList.remove("opacity-low");
                editbtn.disabled = false;
                delbtn.classList.remove("opacity-low");
                delbtn.disabled = false;

                if (newInput.value.trim() === "") {
                    textSpan.textContent = tempValue;
                    newInput.replaceWith(textSpan);
                }
                else {
                    todo.text = newInput.value.trim()
                    textSpan.textContent = todo.text;
                    newInput.replaceWith(textSpan);
                }
                saveTodo()
            }
        })
    })

    let delbtn = document.createElement("button");
    delbtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`
    delbtn.classList.add("delTodo-btn");
    delbtn.addEventListener("click", () => {
        todos.splice(index, 1);
        saveTodo();
        render();
    })


    todo_div.appendChild(checkbox);
    todo_div.appendChild(textSpan);
    todo_div.appendChild(editbtn);
    todo_div.appendChild(delbtn);
    return todo_div;
}

const render = () => {
    todo_list_div.innerHTML = '';

    todos.forEach((todo, index) => {
        let node = createTodoNode(todo, index);
        todo_list_div.appendChild(node);
    });
    saveTodo();
}

const addTodo = () => {
    const text = input.value.trim();
    if (!text) {
        return;
    }

    todos.push({ text, completed: false });
    input.value = '';
    saveTodo();
    render()
}

btn.addEventListener("click", () => {
    addTodo();
});

window.document.addEventListener("keydown", (evt) => {
    if (evt.key === "Enter") {
        addTodo();
    }
})

render();