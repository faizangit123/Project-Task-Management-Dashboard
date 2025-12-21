import React from 'react';
import '../styles/Dashboard.css';

/**
 * Dashboard Component
 * Displays task statistics and progress overview
 */
function Dashboard({ tasks }) {
  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  
  // Calculate overdue tasks
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const overdueTasks = tasks.filter(task => {
    if (task.status === 'completed') return false;
    const dueDate = new Date(task.dueDate);
    return dueDate < today;
  }).length;

  // Calculate completion percentage
  const completionPercentage = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;

  const stats = [
    {
      title: 'Total Tasks',
      value: totalTasks,
      description: 'All tasks in your list',
      icon: '📋',
      iconClass: 'total'
    },
    {
      title: 'Completed',
      value: completedTasks,
      description: 'Tasks finished',
      icon: '✅',
      iconClass: 'completed'
    },
    {
      title: 'Pending',
      value: pendingTasks,
      description: 'Tasks to complete',
      icon: '⏳',
      iconClass: 'pending'
    },
    {
      title: 'Overdue',
      value: overdueTasks,
      description: 'Past due date',
      icon: '⚠️',
      iconClass: 'overdue'
    }
  ];

  return (
    <div className="dashboard">
      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div className="stat-card" key={index}>
            <div className="stat-card-header">
              <span className="stat-card-title">{stat.title}</span>
              <div className={`stat-card-icon ${stat.iconClass}`}>
                {stat.icon}
              </div>
            </div>
            <div className="stat-card-value">{stat.value}</div>
            <div className="stat-card-description">{stat.description}</div>
          </div>
        ))}
      </div>

      {/* Progress Section */}
      <div className="progress-section">
        <div className="progress-header">
          <span className="progress-title">Overall Progress</span>
          <span className="progress-percentage">{completionPercentage}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
