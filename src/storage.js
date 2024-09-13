export function saveToLocal(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

export function loadFromLocal() {
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
}

export function saveHashtag(hashtags) {
    localStorage.setItem('hashtags', JSON.stringify(hashtags));
}

export function loadHashtag() {
    const hashtags = localStorage.getItem('hashtags');
    console.log(hashtags);
    return hashtags ? JSON.parse(hashtags) : [];
}
