import { Todo, TodoUI } from "./home";
import { compareAsc, format } from "date-fns";

format(new Date(2014, 1, 11), "yyyy-MM-dd");
//=> '2014-02-11'

const dates = [
  new Date(1995, 6, 2),
  new Date(1987, 1, 11),
  new Date(1989, 6, 10),
];

export function saveToLocal(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

export function loadFromLocal() {
    try {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        return todos.map(data => new Todo(data.title, data.description, data.date, data.priority, data.hashtag, data.borderColor, data.checked));
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
