
export class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    createTodo() {
        console.log("AHHA");
    }
}

export class TodoUI {
    constructor(){
        this.board = document.querySelector("#board");
        this.addButton = document.querySelector("#add-btn");
    }

    addTodo() {
        const title = document.querySelector("#form-title").value;
        const description = document.querySelector("#form-description").value;
        const date = document.querySelector("#form-date").value;

        createTodo();
    }
}