import { saveToLocal, loadFromLocal, saveHashtag } from './storage.js';
import { nanoid } from "nanoid";

export class Todo {
    constructor(title, description, dueDate, priority, hashtag) {
        this.title = title || "Untitled";
        this.description = description || "No description";
        this.dueDate = dueDate || "No due date";
        this.priority = priority || "Low";
        this.hashtag = hashtag || "general";
		this.borderColor = this.borderColor;
    }

    createTodo() {
        return `${this.title} - ${this.description} - ${this.dueDate} - ${this.priority} - #${this.hashtag}`;
    }
}

export class TodoUI {
    constructor() {
        this.initializeElements();
        this.initializeEventListeners();
        this.currentPriority = "High";
        this.hashtag = "school";
        this.todos = [];
		this.hashtags = [];
    }

    initializeElements() {
        this.board = document.querySelector("#board");
        this.addButton = document.querySelector("#add-btn");
        this.priorityButtons = document.querySelectorAll(".btn");
    }

    initializeEventListeners() {
        this.priorityButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                this.currentPriority = event.target.value;
            });
        });
    }
    
    // add a todo sticky with a delete button
    addTodo(todo) {
        const title = document.querySelector("#form-title").value;
        const description = document.querySelector("#form-description").value;
        const date = document.querySelector("#form-date").value;
        const hashtag = document.querySelector("#form-hashtag").value;
		const borderColor = this.setBorderColor(this.currentPriority);
		console.log(borderColor);

        const sticky = new Todo(title, description, date, this.currentPriority, hashtag, borderColor);
        
        // Add each sticky to local storage
        this.addTodoToStorage(sticky);

        const stickyText = this.createStickyText(sticky);
        const checkbox = this.createCheckbox();
        const stickyPair = this.createStickyPair(stickyText, checkbox, sticky, borderColor);
    
        const stickies = document.querySelector(".stickies");

        stickies.appendChild(stickyPair);
    }

	addTodoToStorage(newTodo) {
		const existingTodos = loadFromLocal();
		existingTodos.push(newTodo);
		saveToLocal(existingTodos);
	}

	addStored(sticky) {
		console.log(sticky)
        const stickyText = this.createStickyText(sticky);
        const checkbox = this.createCheckbox();
        const stickyPair = this.createStickyPair(stickyText, checkbox, sticky);
    
        const stickies = document.querySelector(".stickies");

        stickies.appendChild(stickyPair);
	}
    
	setBorderColor(priority) {
		switch (priority) {
			case "High":
				return "5px solid red";
			case "Medium":
				return "5px solid yellow";
			case "Low":
				return "5px solid green";
		}
	}

    createStickyText(sticky) {
        const stickyText = document.createElement("p");
        stickyText.textContent = sticky.createTodo();
        stickyText.className = "sticky";
        return stickyText;
    }
    
    createDeleteButton(stickyPair, sticky) {
		const delButton = document.createElement("button");
        delButton.className = "delete";
        delButton.textContent = "Delete";
        delButton.addEventListener('click', () => this.removeTodo(stickyPair, sticky));
        return delButton;
    }
    
    createCheckbox() {
        const checkbox = document.createElement("input");
        checkbox.className = "checkbox";
        checkbox.setAttribute("type", "checkbox");
        return checkbox;
    }
    
    createStickyPair(stickyText, checkbox, sticky, borderColor) {
        const stickyPair = document.createElement("div");
        stickyPair.className = "sticky-pair";
    
        const start = document.createElement("div");
        start.className = "start";
        start.appendChild(checkbox);
        start.appendChild(stickyText);
    
        const delButton = this.createDeleteButton(stickyPair, sticky);
        stickyPair.appendChild(start);
        stickyPair.appendChild(delButton);

		stickyPair.style.borderLeft = borderColor;
    
        return stickyPair;
    }

    removeTodo(stickyPair, todo) {
		console.log("Todo to remove:", todo);
		var existingTodos = loadFromLocal();
		
		console.log("Todos before removal:", existingTodos);

        stickyPair.remove();
        existingTodos.pop();
        saveToLocal(existingTodos);
		console.log("After: ", existingTodos)
    }

	
    appendList(hashtag) {
		if (!hashtag.trim()) {
			return;
		}
        const hashtagsSection = document.querySelector(".hashtags-section");
        const newHashtag = document.createElement("p");
        newHashtag.textContent = `#${hashtag}`;
        newHashtag.className = "hashtag";
    
        // Check for repeat hashtags using the some method
        const hashtagExists = Array.from(hashtagsSection.children).some(child => child.textContent === newHashtag.textContent);
    
        if (!hashtagExists) {
            hashtagsSection.append(newHashtag);

			// save hashtags to local storage
			this.hashtags.push(hashtag);
			saveHashtag(this.hashtags);
			console.log(this.hashtags);

            newHashtag.addEventListener("click", (event) => {
                hashtagsSection.removeChild(event.target);
                console.log("Hashtag removed:", event.target.textContent);

                this.hashtags = this.hashtags.filter(t => t !== hashtag);
                saveHashtag(this.hashtags);
                console.log(this.hashtags);
            });
        }
    }
}