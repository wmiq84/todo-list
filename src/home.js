

export class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    createTodo() {
        return `${this.title} | ${this.description} | ${this.dueDate} | ${this.priority}`;
    }
}

export class TodoUI {
    constructor(){
        this.board = document.querySelector("#board");
        this.addButton = document.querySelector("#add-btn");
        this.priorityButton = document.querySelectorAll(".btn");
        this.currentPriority = "Low";

        this.priorityButton.forEach(button => {
            button.addEventListener('click', (event) => {
                this.currentPriority = event.target.value;
        });
    });
    }

    // add a todo sticky with a delete button
    addTodo() {
        const title = document.querySelector("#form-title").value;
        const description = document.querySelector("#form-description").value;
        const date = document.querySelector("#form-date").value;
        const stickies = document.querySelector(".stickies");

        const stickyText = document.createElement("p");
        const delButton = document.createElement("button");
        const stickyPair = document.createElement("div");
        const checkbox = document.createElement("input");
        const start = document.createElement("div");

        const sticky = new Todo(title, description, date, this.currentPriority);

        stickyText.textContent = sticky.createTodo();
        stickyText.className = "sticky";
        delButton.className = "delete";
        delButton.textContent = "Delete"; 
        stickyPair.className = "sticky-pair";
        checkbox.className = "checkbox";
        checkbox.setAttribute("type", "checkbox");
        start.className = "start";

        stickies.appendChild(stickyPair);
        stickyPair.appendChild(start);
        start.appendChild(checkbox);
        start.appendChild(stickyText);
        stickyPair.appendChild(delButton);

        // attach event listener to delete buttons
        delButton.addEventListener('click', () => this.removeTodo(stickyPair));
    }

    removeTodo(stickyPair) {
        stickyPair.remove();
    }
}

const templateDelete = document.querySelector(".delete")
templateDelete.addEventListener('click', () => this.removeTodo(stickyPair));
