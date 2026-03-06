const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, 'data', 'todos.json');

function load() {
  if (!fs.existsSync(FILE)) return [];
  return JSON.parse(fs.readFileSync(FILE, 'utf8'));
}

function save(todos) {
  fs.writeFileSync(FILE, JSON.stringify(todos, null, 2));
}

function getAll() {
  return load();
}

function create(text) {
  const todos = load();
  const todo = { id: Date.now().toString(), text, completed: false, createdAt: new Date().toISOString() };
  todos.push(todo);
  save(todos);
  return todo;
}

function update(id, data) {
  const todos = load();
  const idx = todos.findIndex(t => t.id === id);
  if (idx === -1) return null;
  todos[idx] = { ...todos[idx], ...data };
  save(todos);
  return todos[idx];
}

function remove(id) {
  const todos = load();
  const idx = todos.findIndex(t => t.id === id);
  if (idx === -1) return false;
  todos.splice(idx, 1);
  save(todos);
  return true;
}

module.exports = { getAll, create, update, remove };
