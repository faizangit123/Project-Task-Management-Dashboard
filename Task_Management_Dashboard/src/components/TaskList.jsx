import React from 'react';
import TaskItem from './TaskItem';
import '../styles/TaskList.css';

/**
 * TaskList Component
 * Displays filtered and sorted list of tasks
 */
function TaskList({ 
  tasks, 
  onToggle, 
  onEdit, 
  onDelete,
  sortBy,
  setSortBy,
  searchQuery,
  setSearchQuery
}) {
  return (
    <div className="task-list-container">
      {/* Filter Bar */}
      <div className="filter-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        <div className="filter-group">
          <label className="filter-label">Sort by:</label>
          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
            <option value="created">Created</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      <div className="task-list">
        {tasks.length === 0 ? (
          <div className="task-list-empty">
            <div className="empty-icon">📝</div>
            <h3 className="empty-title">No tasks found</h3>
            <p className="empty-description">
              Create a new task to get started or adjust your filters.
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TaskList;
