const form = document.querySelector("#addToDoForm");
const todoInput = document.querySelector("#addToDoValeu");
const todoItems = document.querySelector("#items");

const config = () => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  if (!todos) {
    localStorage.setItem("todos", JSON.stringify([]));
  } else {
    todos.forEach((todo) => {
      addInnerHTML(todo);
    });
  }
};

const addTodo = (e) => {
  e.preventDefault();

  const inputValue = todoInput.value;

  if (inputValue == "") {
    todoInput.style.border = "1px solid tomato";
    setTimeout(() => {
      todoInput.style.borderColor = "transparent";
    }, 1000);
    return false;
  }

  const todo = {
    text: inputValue,
  };

  const todos = JSON.parse(localStorage.getItem("todos"));
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));

  addInnerHTML(todo);

  form.reset();
};

addInnerHTML = (todo) => {
  const listItem = document.createElement("div");
  listItem.classList.add("item");

  const li = document.createElement("li");
  li.textContent = todo.text;

  const a = document.createElement("a");
  a.textContent = "X";
  a.setAttribute("href", "#");
  a.addEventListener("click", deleteBtn);

  listItem.appendChild(li);
  listItem.appendChild(a);
  todoItems.appendChild(listItem);
};

const deleteBtn = (e) => {
  const todo = e.target.parentElement;
  const text = todo.firstChild.textContent;
  let todos = JSON.parse(localStorage.getItem("todos"));
  todos = todos.filter((td) => td.text != text);
  localStorage.setItem("todos", JSON.stringify(todos));
  todo.remove();
};

form.addEventListener("submit", addTodo);

config();
