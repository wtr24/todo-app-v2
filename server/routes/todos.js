const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const DATA_FILE = path.join(__dirname, '..', 'data', 'todos.json');

function readTodos() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, '[]');
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

function writeTodos(todos) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
}

router.get('/', (req, res) => {
  res.json(readTodos());
});

router.post('/', (req, res) => {
  const todos = readTodos();
  const todo = {
    id: Date.now(),
    text: req.body.text,
    completed: false,
    priority: req.body.priority || 'medium',
    dueDate: req.body.dueDate || null,
    category: req.body.category || '',
    order: todos.length
  };
  todos.push(todo);
  writeTodos(todos);
  res.status(201).json(todo);
});

router.put('/reorder', (req, res) => {
  writeTodos(req.body);
  res.json(req.body);
});

router.put('/:id', (req, res) => {
  const todos = readTodos();
  const idx = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  todos[idx] = { ...todos[idx], ...req.body };
  writeTodos(todos);
  res.json(todos[idx]);
});

router.delete('/:id', (req, res) => {
  const todos = readTodos();
  const filtered = todos.filter(t => t.id !== parseInt(req.params.id));
  writeTodos(filtered);
  res.status(204).end();
});

module.exports = router;
