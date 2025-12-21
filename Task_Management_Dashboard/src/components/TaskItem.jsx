import React from 'react';
import { getCategoryById } from '../utils/categories';

/**
 * TaskItem Component
 * Individual task card with actions
 */
function TaskItem({ task, onToggle, onEdit, onDelete }) {
  // Format the due date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Check if task is overdue
  const isOverdue = () => {
    if (task.status === 'completed') return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(task.dueDate);
    return dueDate < today;
  };

  // Get days until due or days overdue
  const getDaysInfo = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(task.dueDate);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `${diffDays} days left`;
  };

  // Get category info
  const category = getCategoryById(task.category);

  return (
    <div className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}>
      {/* Checkbox */}
      <button
        className={`task-checkbox ${task.status === 'completed' ? 'checked' : ''}`}
        onClick={() => onToggle(task.id)}
        aria-label={task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'}
      >
        {task.status === 'completed' && '✓'}
      </button>

      {/* Task Content */}
      <div className="task-content">
        <div className="task-header">
          <h3 className="task-title">{task.title}</h3>
          <span className={`task-priority ${task.priority}`}>
            {task.priority}
          </span>
          {task.category && (
            <span className={`category-badge ${task.category}`}>
              {category.icon} {category.label}
            </span>
          )}
        </div>
        
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        
        <div className="task-meta">
          <span className={`task-meta-item ${isOverdue() ? 'overdue' : ''}`}>
            📅 {formatDate(task.dueDate)}
          </span>
          <span className={`task-meta-item ${isOverdue() ? 'overdue' : ''}`}>
            ⏱️ {getDaysInfo()}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="task-actions">
        <button
          className="task-action-btn"
          onClick={() => onEdit(task)}
          aria-label="Edit task"
        >
          ✏️
        </button>
        <button
          className="task-action-btn delete"
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
