import React from 'react';
import { CATEGORIES } from '../utils/categories';
import '../styles/Sidebar.css';
import '../styles/Categories.css';

/**
 * Sidebar Component
 * Navigation sidebar with logo, menu items, theme toggle, and new task button
 */
function Sidebar({ isOpen, onClose, onNewTask, activeFilter, setActiveFilter, taskCounts, theme, onToggleTheme }) {
  const navItems = [
    { id: 'all', label: 'All Tasks', icon: '📋', count: taskCounts.total },
    { id: 'pending', label: 'Pending', icon: '⏳', count: taskCounts.pending },
    { id: 'completed', label: 'Completed', icon: '✅', count: taskCounts.completed },
  ];

  const priorityItems = [
    { id: 'high', label: 'High Priority', icon: '🔴', count: taskCounts.high },
    { id: 'medium', label: 'Medium Priority', icon: '🟡', count: taskCounts.medium },
    { id: 'low', label: 'Low Priority', icon: '🟢', count: taskCounts.low },
  ];

  return (
    <>
      {/* Mobile Header */}
      <header className="mobile-header">
        <button className="menu-toggle" onClick={() => onClose()}>
          <span style={{ fontSize: '24px' }}>☰</span>
        </button>
        <div className="sidebar-logo">
          <div className="logo-icon">✓</div>
          <span className="logo-text">TaskFlow</span>
        </div>
        <button className="menu-toggle" onClick={onNewTask}>
          <span style={{ fontSize: '24px' }}>+</span>
        </button>
      </header>

      {/* Overlay for mobile */}
      <div 
        className={`sidebar-overlay ${isOpen ? 'visible' : ''}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-icon">✓</div>
            <span className="logo-text">TaskFlow</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <div className="nav-section-title">Overview</div>
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${activeFilter === item.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveFilter(item.id);
                  onClose();
                }}
              >
                <span className="nav-item-icon">{item.icon}</span>
                <span>{item.label}</span>
                {item.count > 0 && (
                  <span className="nav-item-badge">{item.count}</span>
                )}
              </button>
            ))}
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Priority</div>
            {priorityItems.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${activeFilter === item.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveFilter(item.id);
                  onClose();
                }}
              >
                <span className="nav-item-icon">{item.icon}</span>
                <span>{item.label}</span>
                {item.count > 0 && (
                  <span className="nav-item-badge">{item.count}</span>
                )}
              </button>
            ))}
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Categories</div>
            {CATEGORIES.map((category) => (
              <button
                key={`cat-${category.id}`}
                className={`nav-item ${activeFilter === `category-${category.id}` ? 'active' : ''}`}
                onClick={() => {
                  setActiveFilter(`category-${category.id}`);
                  onClose();
                }}
              >
                <span className="nav-item-icon">{category.icon}</span>
                <span>{category.label}</span>
                {taskCounts[`category-${category.id}`] > 0 && (
                  <span className="nav-item-badge">{taskCounts[`category-${category.id}`]}</span>
                )}
              </button>
            ))}
          </div>
        </nav>

        <div className="sidebar-footer">
          {/* Theme Toggle */}
          <div className="theme-toggle">
            <span className="theme-toggle-label">
              <span className="theme-toggle-icon">{theme === 'dark' ? '🌙' : '☀️'}</span>
              <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
            </span>
            <button 
              className={`theme-switch ${theme === 'dark' ? 'active' : ''}`}
              onClick={onToggleTheme}
              aria-label="Toggle dark mode"
            >
              <span className="theme-switch-knob" />
            </button>
          </div>

          <button className="new-task-btn" onClick={onNewTask}>
            <span>+</span>
            <span>New Task</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
