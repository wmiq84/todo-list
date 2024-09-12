export class Todo {
    constructor(title, description, dueDate, priority, hashtag) {
        this.title = title || "Untitled";
        this.description = description || "No description";
        this.dueDate = dueDate || "No due date";
        this.priority = priority || "Low";
        this.hashtag = hashtag || "general";
    }

    createTodo() {
        return `${this.title} - ${this.description} - ${this.dueDate} - ${this.priority} - #${this.hashtag}`;
    }
}

export class TodoUI {
    constructor() {
        this.initializeElements();
        this.initializeEventListeners();
        this.currentPriority = "Low";
        this.hashtag = "school";
        this.todos = [];
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
    
        const sticky = new Todo(title, description, date, this.currentPriority, hashtag);
        
        // Add each sticky to local storage
        this.todos.push(sticky);
        this.saveToLocal();
        console.log(this.todos);

        const stickyText = this.createStickyText(sticky);
        const checkbox = this.createCheckbox();
        const stickyPair = this.createStickyPair(stickyText, checkbox, sticky);
    
        const stickies = document.querySelector(".stickies");
        stickies.appendChild(stickyPair);
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
    
    createStickyPair(stickyText, checkbox, sticky) {
        const stickyPair = document.createElement("div");
        stickyPair.className = "sticky-pair";
    
        const start = document.createElement("div");
        start.className = "start";
        start.appendChild(checkbox);
        start.appendChild(stickyText);
    
        const delButton = this.createDeleteButton(stickyPair, sticky);
        stickyPair.appendChild(start);
        stickyPair.appendChild(delButton);
    
        return stickyPair;
    }
    
    saveToLocal() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    loadFromLocal() {
        const todos = localStorage.getItem('todos');
        return todos ? JSON.parse(todos) : [];
    }

    removeTodo(stickyPair, todo) {
        stickyPair.remove();
        this.todos = this.todos.filter(t => t !== todo);
        this.saveToLocal();
        console.log(this.todos);
    }

    appendList(hashtag) {
        const hashtagsSection = document.querySelector(".hashtags-section");
        const newHashtag = document.createElement("p");
        newHashtag.textContent = `#${hashtag}`;
        newHashtag.className = "hashtag";
    
        // Check for repeat hashtags using the some method
        const hashtagExists = Array.from(hashtagsSection.children).some(child => child.textContent === newHashtag.textContent);
    
        if (!hashtagExists) {
            hashtagsSection.append(newHashtag);
            newHashtag.addEventListener("click", (event) => {
                hashtagsSection.removeChild(event.target);
                console.log("Hashtag removed:", event.target.textContent);
            });
        }
    }
}

