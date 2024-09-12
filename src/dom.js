import { Todo, TodoUI } from "./home.js";

import { compareAsc, format } from "date-fns";

format(new Date(2014, 1, 11), "yyyy-MM-dd");
//=> '2014-02-11'

const addButton = document.querySelector("#add-btn");
const newSticky = new TodoUI();

const priorityButton = document.querySelectorAll(".btn");
const firstButton = document.querySelector(".delete");
const firstStart = document.querySelector(".stickies");


// allow for default log to be removed
firstButton.addEventListener('click', () => {
   while (firstStart.firstChild) {
    firstStart.removeChild(firstStart.firstChild);
   } 
});

const storedStickies = newSticky.loadFromLocalStorage();
storedStickies.forEach(todo => newSticky.addTodo(todo));
console.log(storedStickies);

addButton.addEventListener('click', (event) => {
    const hashtag = document.querySelector("#form-hashtag").value;

    event.preventDefault();

    newSticky.addTodo();
    newSticky.appendList(hashtag);
});

priorityButton.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
    });
});

const hashtagsSection = document.querySelector(".hashtags-section");
const newHashtag = document.querySelectorAll("p");


