
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

        const sticky = new Todo(title, description, date, "High");

        stickyText.textContent = sticky.createTodo();
        stickyText.className = "sticky";
        delButton.className = "delete";
        delButton.textContent = "Delete"; 
        stickyPair.className = "sticky-pair";

        stickies.appendChild(stickyPair);
        stickyPair.appendChild(stickyText);
        stickyPair.appendChild(delButton);
        

    }

    //
}