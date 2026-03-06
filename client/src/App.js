import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Header from './components/Header';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import FilterBar from './components/FilterBar';
import DarkMode from './components/DarkMode';

const API = '/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [filters, setFilters] = useState({ search: '', priority: '', category: '', status: '' });
  const [dark, setDark] = useState(() => localStorage.getItem('dark') === 'true');
  const dragId = useRef(null);
  const dragOverId = useRef(null);

  useEffect(() => {
    axios.get(API).then(r => setTodos(r.data));
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark', dark);
    localStorage.setItem('dark', dark);
  }, [dark]);

  const addTodo = async ({ text, priority, dueDate, category }) => {
    const { data } = await axios.post(API, { text, priority, dueDate, category });
    setTodos([...todos, data]);
  };

  const toggleTodo = async (id, completed) => {
    const { data } = await axios.put(`${API}/${id}`, { completed: !completed });
    setTodos(todos.map(t => t.id === id ? data : t));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/${id}`);
    setTodos(todos.filter(t => t.id !== id));
  };

  const onDragStart = (id) => { dragId.current = id; };
  const onDragOver = (id) => { dragOverId.current = id; };
  const onDrop = async () => {
    const from = dragId.current;
    const to = dragOverId.current;
    if (!from || !to || from === to) return;
    const reordered = [...todos];
    const fromIdx = reordered.findIndex(t => t.id === from);
    const toIdx = reordered.findIndex(t => t.id === to);
    const [moved] = reordered.splice(fromIdx, 1);
    reordered.splice(toIdx, 0, moved);
    setTodos(reordered);
    await axios.put(`${API}/reorder`, reordered);
    dragId.current = null;
    dragOverId.current = null;
  };

  const categories = [...new Set(todos.map(t => t.category).filter(Boolean))];

  const filtered = todos.filter(t => {
    if (filters.search && !t.text.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.priority && t.priority !== filters.priority) return false;
    if (filters.category && t.category !== filters.category) return false;
    if (filters.status === 'active' && t.completed) return false;
    if (filters.status === 'completed' && !t.completed) return false;
    return true;
  });

  return (
    <div className="app">
      <div className="header-wrap">
        <Header />
        <DarkMode dark={dark} onToggle={() => setDark(d => !d)} />
      </div>
      <AddTodo onAdd={addTodo} />
      <FilterBar filters={filters} onChange={setFilters} categories={categories} />
      <TodoList
        todos={filtered}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
      />
    </div>
  );
}

export default App;
