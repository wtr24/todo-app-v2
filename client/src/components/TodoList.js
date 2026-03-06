import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onToggle, onDelete, onDragStart, onDragOver, onDrop }) {
  const active = todos.filter(t => !t.completed);
  const completed = todos.filter(t => t.completed);

  return (
    <div className="todo-list-container">
      <div className="section-header">
        <span>Active</span>
        <span className="count-badge">{active.length}</span>
      </div>
      {active.length === 0 ? (
        <p className="empty">No active todos!</p>
      ) : (
        <ul className="todo-list">
          {active.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
            />
          ))}
        </ul>
      )}
      {completed.length > 0 && (
        <>
          <div className="section-header completed-header">
            <span>Completed</span>
            <span className="count-badge">{completed.length}</span>
          </div>
          <ul className="todo-list">
            {completed.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDrop={onDrop}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default TodoList;
