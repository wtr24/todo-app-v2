import React from 'react';

function TodoItem({ todo, onToggle, onDelete, onDragStart, onDragOver, onDrop }) {
  const isOverdue = todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date(new Date().toDateString());

  return (
    <li
      className={`todo-item${todo.completed ? ' completed' : ''}${isOverdue ? ' overdue' : ''}`}
      draggable
      onDragStart={() => onDragStart(todo.id)}
      onDragOver={e => { e.preventDefault(); onDragOver(todo.id); }}
      onDrop={() => onDrop(todo.id)}
    >
      <span className="drag-handle">⠿</span>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id, todo.completed)}
      />
      <div className="todo-content">
        <span className="todo-text">{todo.text}</span>
        <div className="todo-meta">
          {todo.category && <span className="tag">{todo.category}</span>}
          {todo.dueDate && <span className={`due-date${isOverdue ? ' overdue-text' : ''}`}>{isOverdue ? '⚠ ' : ''}{todo.dueDate}</span>}
        </div>
      </div>
      <span className={`priority-badge priority-${todo.priority || 'medium'}`}>{todo.priority || 'medium'}</span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
}

export default TodoItem;
