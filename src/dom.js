import { TodoUI } from './home.js';
import { loadFromLocal, loadHashtag } from './storage.js';

(() => {
	// const deleteButton = document.querySelector('.delete');
	// const stickiesContainer = document.querySelector('.stickies');\
	// const hashtagsSection = document.querySelector('.hashtags-section');

	const priorityButtons = document.querySelectorAll('.btn');
	const addButton = document.querySelector('#add-btn');
	const newSticky = new TodoUI();

	// load stickies from local storage
	const storedStickies = loadFromLocal();
	storedStickies.forEach((todo) => newSticky.addStored(todo));
	console.log(storedStickies);

	// load hashtags from local storage
    const storedHashtags = loadHashtag();
    if (Array.isArray(storedHashtags)) {
        storedHashtags.forEach((hashtag) => newSticky.appendList(hashtag));
    } else {
        console.error("storedHashtags is not an array:", storedHashtags);
    }
    console.log(storedHashtags);

	if (addButton) {
		addButton.addEventListener('click', (event) => {
			event.preventDefault();
			const hashtag = document.querySelector('#form-hashtag').value;
			newSticky.addTodo();
			newSticky.appendList(hashtag);
		});
	}

	if (priorityButtons) {
		priorityButtons.forEach((button) => {
			button.addEventListener('click', (event) => {
				event.preventDefault();
			});
		});
	}
})();
