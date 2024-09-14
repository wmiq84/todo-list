import { saveToLocal, loadFromLocal, saveHashtag } from './storage.js';
import { nanoid } from 'nanoid';
import { format, parseISO } from 'date-fns';

export class Todo {
	constructor(title, description, dueDate, priority, hashtag, borderColor, checked = false, id) {
		this.title = title || 'Untitled';
		this.description = description || 'No description';
		this.dueDate = dueDate || '';
		this.priority = priority || 'Low';
		this.hashtag = hashtag || 'general';
		this.borderColor = borderColor;
		this.checked = checked;
	}

	createTodo() {
		return `${this.title} - #${this.hashtag}`;
	}
}

export class TodoUI {
	constructor() {
		this.initializeElements();
		this.initializeEventListeners();
		this.currentPriority = 'High';
		this.hashtag = 'school';
		this.todos = [];
		this.hashtags = [];
	}

	initializeElements() {
		this.board = document.querySelector('#board');
		this.addButton = document.querySelector('#add-btn');
		this.priorityButtons = document.querySelectorAll('.btn');
	}

	initializeEventListeners() {
		this.priorityButtons.forEach((button) => {
			button.addEventListener('click', (event) => {
				this.currentPriority = event.target.value;
			});
		});
	}

	// add a todo sticky with a delete button
	addTodo() {
		const title = document.querySelector('#form-title').value;
		const description = document.querySelector('#form-description').value;
		const dueDate = document.querySelector('#form-date').value;
		const hashtag = document.querySelector('#form-hashtag').value;
		const borderColor = this.setBorderColor(this.currentPriority);

		const sticky = new Todo(
			title,
			description,
			dueDate,
			this.currentPriority,
			hashtag,
			borderColor
		);

		// Add each sticky to local storage
		this.addTodoToStorage(sticky);
		this.appendSticky(sticky, borderColor);
		this.appendList("all"); // add all filtering to hashtag
	}

	addTodoToStorage(newTodo) {
		const existingTodos = loadFromLocal();
		existingTodos.push(newTodo);
		saveToLocal(existingTodos);
	}

	addStored(sticky) {
		const borderColor = sticky.borderColor;
		this.appendSticky(sticky, borderColor);
	}

	appendSticky(sticky, borderColor) {
		const stickyText = this.createStickyText(sticky);
		const checkbox = this.createCheckbox(sticky.id); // Use id as unique identifier
		checkbox.checked = sticky.checked; 

		checkbox.addEventListener('change', () => {
			sticky.checked = checkbox.checked;
			this.updateTodoInStorage(sticky);
		});

		const stickyPair = this.createStickyPair(
			stickyText,
			checkbox,
			sticky,
			borderColor
		);

		const stickies = document.querySelector('.stickies');
		stickies.appendChild(stickyPair);
	}

	updateTodoInStorage(updatedTodo) {
		const existingTodos = loadFromLocal();
		const index = existingTodos.findIndex(todo => todo.title === updatedTodo.title);
		if (index !== -1) {
			existingTodos[index] = updatedTodo;
			saveToLocal(existingTodos);
		}
	}

	setBorderColor(priority) {
		switch (priority) {
			case 'High':
				return '5px solid red';
			case 'Medium':
				return '5px solid yellow';
			case 'Low':
				return '5px solid green';
		}
	}

	createStickyText(sticky) {
		const stickyText = document.createElement('p');
		stickyText.textContent = sticky.createTodo();
		stickyText.className = 'sticky';
		return stickyText;
	}

	createDeleteButton(stickyPair, sticky) {
		const delButton = document.createElement('img');
		delButton.src = new URL('../assets/trash-can.svg', import.meta.url).href;
		delButton.alt = 'Delete';
		delButton.classList.add('delete-btn');
		delButton.addEventListener('click', () =>
			this.removeTodo(stickyPair, sticky)
		);
		return delButton;
	}

	createDetailsButton(sticky) {
		const detailsButton = document.createElement('button');
		detailsButton.textContent = 'DETAILS';
		detailsButton.classList.add('details-btn');
		detailsButton.addEventListener('click', () => {
			const modal = document.getElementById('detailsModal');
			const modalText = document.getElementById('modalText');
			modalText.textContent = sticky.description;
			modal.style.display = 'block';
		});

		document.querySelector('.close').addEventListener('click', () => {
			document.getElementById('detailsModal').style.display = 'none';
		});
		return detailsButton;
	}

	createDate(sticky) {
		const dueDate = document.createElement('p');
		console.log(sticky.dueDate)

		// const [year, month, day] = sticky.dueDate.split('-');
		// const dateObject = new Date(year, month - 1, day);
		// console.log(dateObject)

		// dueDate.textContent = format(dateObject, "yyyy, MM, dd");
		dueDate.textContent = sticky.dueDate;
		dueDate.classList.add('date');
		console.log(dueDate);
		return dueDate;
	}

	createCheckbox(id) {
		const checkbox = document.createElement('input');
		checkbox.className = 'checkbox';
		checkbox.id = id;
		checkbox.setAttribute('type', 'checkbox');
		return checkbox;
	}

	createStickyPair(stickyText, checkbox, sticky, borderColor) {
		const stickyPair = document.createElement('div');
		stickyPair.className = 'sticky-pair';

		const dueDate = this.createDate(sticky);
		const delButton = this.createDeleteButton(stickyPair, sticky);
		const detailsButton = this.createDetailsButton(sticky);

		const start = document.createElement('div');
		start.className = 'start';
		start.appendChild(checkbox);
		start.appendChild(stickyText);

		const end = document.createElement('div');
		end.className = 'end';
		end.appendChild(dueDate);
		end.appendChild(detailsButton);
		end.appendChild(delButton);

		stickyPair.appendChild(start);
		stickyPair.appendChild(end);

		stickyPair.style.borderLeft = borderColor;

		stickyPair.classList.add('fade-in');

		return stickyPair;
	}

	removeTodo(stickyPair, todo) {
		console.log('Todo to remove:', todo);
		var existingTodos = loadFromLocal();

		// Find the index of the todo to remove
		const index = existingTodos.findIndex(
			(t) =>
				t.title === todo.title &&
				t.description === todo.description &&
				t.dueDate === todo.dueDate &&
				t.priority === todo.priority &&
				t.hashtag === todo.hashtag &&
				t.borderColor === todo.borderColor
		);

		if (index !== -1) {
			// Remove the todo from the array
			existingTodos.splice(index, 1);
		}

		stickyPair.classList.add('fade-out');

		// fade out animation
		setTimeout(() => {
			stickyPair.remove();
			saveToLocal(existingTodos);
			console.log('Todos after removal:', existingTodos);
		}, 250);
	}

	// rendering used for hashtags
    saveAndRenderTodos() {
        saveToLocal(this.todos);
        this.renderTodos();
    }

    renderTodos() {
        const stickies = document.querySelector('.stickies');
        stickies.innerHTML = ''; // Clear existing stickies
        this.todos.forEach(todo => this.appendSticky(todo, todo.borderColor));
    }

	
	appendList(hashtag) {
		if (!hashtag.trim()) {
			return;
		}
		const hashtagsSection = document.querySelector('.hashtags-section');
		const newHashtag = document.createElement('p');
		newHashtag.textContent = `#${hashtag}`;
		newHashtag.className = 'hashtag';

		// Check for repeat hashtags using the some method
		const hashtagExists = Array.from(hashtagsSection.children).some(
			(child) => child.textContent === newHashtag.textContent
		);

		if (!hashtagExists) {
			hashtagsSection.append(newHashtag);

			// save hashtags to local storage
			this.hashtags.push(hashtag);
			saveHashtag(this.hashtags);
			console.log(this.hashtags);

			// code for viewing stickies associated with hashtag
			newHashtag.addEventListener('click', (event) => {
                const selectedHashtag = event.target.textContent.slice(1); 
                console.log('Selected Hashtag:', selectedHashtag);
                const storedTodos = loadFromLocal();
				const filteredTodos = selectedHashtag === 'all' ? storedTodos : storedTodos.filter(todo => todo.hashtag === selectedHashtag);
                this.todos = filteredTodos;
                this.renderTodos();
			});
		}
	}
}
