import { Todo, TodoUI } from "./home.js";

const board = document.querySelector("#board");

const addButton = document.querySelector("#add-btn");

const newSticky = new TodoUI();

addButton.addEventListener('click', (event) => {
    event.preventDefault();
    newSticky.addTodo();
});