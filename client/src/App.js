import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

const API = '/api/todos';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get(API).then(r => setTodos(r.data));
  }, []);

  const addTodo = async (text) => {
    const { data } = await axios.post(API, { text });
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

  return (
    <div className="app">
      <Header />
      <AddTodo onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  );
}

export default App;
