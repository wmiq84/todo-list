import { Todo, TodoUI } from "./home.js";

import { compareAsc, format } from "date-fns";

format(new Date(2014, 1, 11), "yyyy-MM-dd");
//=> '2014-02-11'

const dates = [
  new Date(1995, 6, 2),
  new Date(1987, 1, 11),
  new Date(1989, 6, 10),
];
dates.sort(compareAsc);
//=> [
//   Wed Feb 11 1987 00:00:00,
//   Mon Jul 10 1989 00:00:00,
//   Sun Jul 02 1995 00:00:00
// ]

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

addButton.addEventListener('click', (event) => {
    const hashtag = document.querySelector("#form-hashtag").value;

    event.preventDefault();
    newSticky.addTodo();
    newSticky.appendList(hashtag);
});

priorityButton.forEach(button => {
        button.addEventListener('click', (event) => {
            // newSticky.setPriority(event);
            event.preventDefault();
    });
});

const hashtagsSection = document.querySelector(".hashtags-section");
const newHashtag = document.querySelectorAll("p");


