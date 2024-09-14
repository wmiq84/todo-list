import { saveToLocal, loadFromLocal, saveHashtag } from './storage.js';
import { nanoid } from 'nanoid';

export class Todo {
	constructor(title, description, dueDate, priority, hashtag, borderColor) {
		this.title = title || 'Untitled';
		this.description = description || 'No description';
		this.dueDate = dueDate || 'No due date';
		this.priority = priority || 'Low';
		this.hashtag = hashtag || 'general';
		this.borderColor = borderColor;
	}

	createTodo() {
		return `${this.title} - ${this.dueDate} - ${this.priority} - #${this.hashtag}`;
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
	addTodo(todo) {
		const title = document.querySelector('#form-title').value;
		const description = document.querySelector('#form-description').value;
		const date = document.querySelector('#form-date').value;
		const hashtag = document.querySelector('#form-hashtag').value;
		const borderColor = this.setBorderColor(this.currentPriority);

		const sticky = new Todo(
			title,
			description,
			date,
			this.currentPriority,
			hashtag,
			borderColor
		);

		// Add each sticky to local storage
		this.addTodoToStorage(sticky);
		this.appendSticky(sticky, borderColor);
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
		const checkbox = this.createCheckbox();
		const stickyPair = this.createStickyPair(
			stickyText,
			checkbox,
			sticky,
			borderColor
		);

		const stickies = document.querySelector('.stickies');
		stickies.appendChild(stickyPair);
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
		detailsButton.textContent = "DETAILS";
		detailsButton.classList.add('details-btn');
		detailsButton.addEventListener('click', () => {
			const modal = document.getElementById('detailsModal');
			const modalText = document.getElementById('modalText');
            modalText.textContent = sticky.description;
			modal.style.display = "block";
		});

		document.querySelector('.close').addEventListener('click', () => {
			document.getElementById('detailsModal').style.display = "none";
		});
		return detailsButton;
	}

	createCheckbox() {
		const checkbox = document.createElement('input');
		checkbox.className = 'checkbox';
		checkbox.setAttribute('type', 'checkbox');
		return checkbox;
	}

	createStickyPair(stickyText, checkbox, sticky, borderColor) {
		const stickyPair = document.createElement('div');
		stickyPair.className = 'sticky-pair';

		const delButton = this.createDeleteButton(stickyPair, sticky);
		const detailsButton = this.createDetailsButton(sticky);

		const start = document.createElement('div');
		start.className = 'start';
		start.appendChild(checkbox);
		start.appendChild(stickyText);

		const end = document.createElement('div');
		end.className = 'end';
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
				t.date === todo.date &&
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

			newHashtag.addEventListener('click', (event) => {
				hashtagsSection.removeChild(event.target);
				console.log('Hashtag removed:', event.target.textContent);

				this.hashtags = this.hashtags.filter((t) => t !== hashtag);
				saveHashtag(this.hashtags);
				console.log(this.hashtags);
			});
		}
	}
}
