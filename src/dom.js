import { Todo, TodoUI } from "./home.js";

import { compareAsc, format } from "date-fns"

(() => {
  const priorityButtons = document.querySelectorAll(".btn");
  const deleteButton = document.querySelector(".delete");
  const stickiesContainer = document.querySelector(".stickies");
  const addButton = document.querySelector("#add-btn");
  const hashtagsSection = document.querySelector(".hashtags-section");
  const newSticky = new TodoUI();

  if (deleteButton && stickiesContainer) {
      // Allow for default log to be removed
      deleteButton.addEventListener('click', () => {
          while (stickiesContainer.firstChild) {
              stickiesContainer.removeChild(stickiesContainer.firstChild);
          }
      });
  }

  const storedStickies = newSticky.loadFromLocal();
  storedStickies.forEach(todo => newSticky.addTodo(todo));
  console.log(storedStickies);

  if (addButton) {
      addButton.addEventListener('click', (event) => {
          event.preventDefault();
          const hashtag = document.querySelector("#form-hashtag").value;
          newSticky.addTodo();
          newSticky.appendList(hashtag);
      });
  }

  if (priorityButtons) {
      priorityButtons.forEach(button => {
          button.addEventListener('click', (event) => {
              event.preventDefault();
          });
      });
  }
})();