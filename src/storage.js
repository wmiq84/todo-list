import { Todo, TodoUI } from "./home";

export function saveToLocal(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

export function loadFromLocal() {
    try {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        return todos.map(data => new Todo(data.title, data.description, data.date, data.priority, data.hashtag, data.borderColor));
    } catch (e) {
        console.error("Error parsing todos from localStorage", e);
        return [];
    }
}

export function saveHashtag(hashtags) {
    localStorage.setItem('hashtags', JSON.stringify(hashtags));
}

export function loadHashtag() {
    const hashtags = localStorage.getItem('hashtags');
    console.log(hashtags);
    return hashtags ? JSON.parse(hashtags) : [];
}
