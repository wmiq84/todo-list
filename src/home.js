

export class Todo {
    constructor(title, description, dueDate, priority, hashtag) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.hashtag = hashtag;
    }

    createTodo() {
        return `${this.title} - ${this.description} - ${this.dueDate} - ${this.priority} - #${this.hashtag}`;
    }
}

export class TodoUI {
    constructor(){
        this.board = document.querySelector("#board");
        this.addButton = document.querySelector("#add-btn");
        this.priorityButton = document.querySelectorAll(".btn");
        this.currentPriority = "Low";
        this.hashtag = "school"
        this.todos = [];

        this.priorityButton.forEach(button => {
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
        const stickies = document.querySelector(".stickies");
        const hashtag = document.querySelector("#form-hashtag").value;

        const stickyText = document.createElement("p");
        const delButton = document.createElement("button");
        const stickyPair = document.createElement("div");
        const checkbox = document.createElement("input");
        const start = document.createElement("div");

        if (!todo) {
            const sticky = new Todo(title, description, date, this.currentPriority, hashtag);
        
            //add each sticky to local
            this.todos.push(sticky);
            this.savetoLocal();
            console.log(this.todos);

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
            delButton.addEventListener('click', () => this.removeTodo(stickyPair, sticky));
        }
        else {
            const sticky = new Todo(todo.title, todo.description, todo.date, todo.currentPriority, todo.hashtag);

            //add each sticky to local
            this.todos.push(sticky);
            this.savetoLocal();
            console.log(this.todos);

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
            delButton.addEventListener('click', () => this.removeTodo(stickyPair, sticky));
        }
    }

    savetoLocal() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    loadFromLocalStorage() {
        const todos = localStorage.getItem('todos');
        return todos ? JSON.parse(todos) : [];
    }

    removeTodo(stickyPair, todo) {
        stickyPair.remove();
        this.todos = this.todos.filter(t => t !== todo);
        this.savetoLocal();
        console.log(this.todos);
    }

    appendList(hashtag) {
        const hashtagsSection = document.querySelector(".hashtags-section");
        const newHashtag = document.createElement("p");
        newHashtag.textContent = `#${hashtag}`; 
        // checks for repeat hashtags
        let hashtagExists = false; 
        for (let child of hashtagsSection.children) {
            if (child.textContent === newHashtag.textContent) {
                hashtagExists = true;
                break;
            }
        }      
        if (!hashtagExists) {
            newHashtag.textContent = "#" + hashtag;
            newHashtag.className = "hashtag";  
            hashtagsSection.append(newHashtag);
            this.removeHashtag(newHashtag);
        }
    }

    removeHashtag(newHashtag){
        const hashtagsSection = document.querySelector(".hashtags-section");
            newHashtag.addEventListener("click", (event) => {
                hashtagsSection.removeChild(event.target);
                console.log("test");
        });
    }
}

