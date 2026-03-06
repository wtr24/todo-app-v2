import React from 'react';

function DarkMode({ dark, onToggle }) {
  return (
    <button className="dark-mode-btn" onClick={onToggle} title="Toggle dark mode">
      {dark ? '☀' : '🌙'}
    </button>
  );
}

export default DarkMode;
