import React, { useState } from 'react';

function AddTodo({ onAdd }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd({ text: text.trim(), priority, dueDate, category: category.trim() });
    setText('');
    setPriority('medium');
    setDueDate('');
    setCategory('');
  };

  return (
    <form className="add-todo" onSubmit={submit}>
      <div className="add-todo-row">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a new todo..."
        />
        <button type="submit">Add</button>
      </div>
      <div className="add-todo-meta">
        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />
        <input
          value={category}
          onChange={e => setCategory(e.target.value)}
          placeholder="Category..."
        />
      </div>
    </form>
  );
}

export default AddTodo;
