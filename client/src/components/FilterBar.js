import React from 'react';

function FilterBar({ filters, onChange, categories }) {
  return (
    <div className="filter-bar">
      <input
        placeholder="Search todos..."
        value={filters.search}
        onChange={e => onChange({ ...filters, search: e.target.value })}
      />
      <select value={filters.priority} onChange={e => onChange({ ...filters, priority: e.target.value })}>
        <option value="">All priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <select value={filters.category} onChange={e => onChange({ ...filters, category: e.target.value })}>
        <option value="">All categories</option>
        {categories.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <select value={filters.status} onChange={e => onChange({ ...filters, status: e.target.value })}>
        <option value="">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}

export default FilterBar;
