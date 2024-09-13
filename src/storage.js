export function saveToLocal(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

export function loadFromLocal() {
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
}
