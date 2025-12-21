import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { CATEGORIES } from './utils/categories';
import './styles/variables.css';
import './styles/App.css';
import './styles/Categories.css';

// Sample initial tasks for demonstration
const sampleTasks = [
  {
    id: '1',
    title: 'Complete project documentation',
    description: 'Write comprehensive documentation for the new feature including API endpoints and usage examples.',
    priority: 'high',
    category: 'work',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'pending',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Review pull requests',
    description: 'Review and provide feedback on pending pull requests from the team.',
    priority: 'medium',
    category: 'work',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'pending',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Buy groceries',
    description: 'Get vegetables, fruits, and weekly essentials.',
    priority: 'low',
    category: 'shopping',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'completed',
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Schedule doctor appointment',
    description: 'Annual health checkup.',
    priority: 'high',
    category: 'health',
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'pending',
    createdAt: new Date().toISOString()
  },
  {
    id: '5',
    title: 'Learn React hooks',
    description: 'Complete the advanced React patterns course.',
    priority: 'medium',
    category: 'learning',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'completed',
    createdAt: new Date().toISOString()
  },
  {
    id: '6',
    title: 'Pay electricity bill',
    description: 'Monthly utility payment.',
    priority: 'high',
    category: 'finance',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'pending',
    createdAt: new Date().toISOString()
  }
];

/**
 * App Component
 * Main application component that manages state and renders the dashboard
 */
function App() {
  // Theme state - load from localStorage or default to light
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('taskflow-theme');
    return saved || 'light';
  });

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('taskflow-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // State for tasks - load from localStorage or use sample data
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('taskflow-tasks');
    return saved ? JSON.parse(saved) : sampleTasks;
  });

  // UI State
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');
  const [searchQuery, setSearchQuery] = useState('');

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('taskflow-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Calculate task counts for sidebar
  const taskCounts = useMemo(() => {
    const counts = {
      total: tasks.length,
      completed: tasks.filter(t => t.status === 'completed').length,
      pending: tasks.filter(t => t.status === 'pending').length,
      high: tasks.filter(t => t.priority === 'high' && t.status === 'pending').length,
      medium: tasks.filter(t => t.priority === 'medium' && t.status === 'pending').length,
      low: tasks.filter(t => t.priority === 'low' && t.status === 'pending').length,
    };
    
    // Add category counts
    CATEGORIES.forEach(cat => {
      counts[`category-${cat.id}`] = tasks.filter(t => t.category === cat.id).length;
    });
    
    return counts;
  }, [tasks]);

  // Filter and sort tasks
  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(task => 
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      );
    }

    // Apply status/priority filter
    switch (activeFilter) {
      case 'completed':
        result = result.filter(t => t.status === 'completed');
        break;
      case 'pending':
        result = result.filter(t => t.status === 'pending');
        break;
      case 'high':
        result = result.filter(t => t.priority === 'high');
        break;
      case 'medium':
        result = result.filter(t => t.priority === 'medium');
        break;
      case 'low':
        result = result.filter(t => t.priority === 'low');
        break;
      default:
        // Check for category filters
        if (activeFilter.startsWith('category-')) {
          const categoryId = activeFilter.replace('category-', '');
          result = result.filter(t => t.category === categoryId);
        }
        break;
    }

    // Apply sorting
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    
    result.sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case 'title':
          return a.title.localeCompare(b.title);
        case 'created':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'dueDate':
        default:
          return new Date(a.dueDate) - new Date(b.dueDate);
      }
    });

    return result;
  }, [tasks, activeFilter, sortBy, searchQuery]);

  // Task handlers
  const handleToggleTask = (taskId) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
        : task
    ));
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      // Update existing task
      setTasks(prev => prev.map(task => 
        task.id === taskData.id ? taskData : task
      ));
    } else {
      // Create new task
      setTasks(prev => [...prev, taskData]);
    }
    setShowForm(false);
    setEditingTask(null);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(task => task.id !== taskId));
    }
  };

  const handleNewTask = () => {
    setEditingTask(null);
    setShowForm(true);
    setSidebarOpen(false);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  // Get filter label for header
  const getFilterLabel = () => {
    const labels = {
      all: 'All Tasks',
      completed: 'Completed Tasks',
      pending: 'Pending Tasks',
      high: 'High Priority',
      medium: 'Medium Priority',
      low: 'Low Priority'
    };
    
    if (labels[activeFilter]) {
      return labels[activeFilter];
    }
    
    // Check for category filter
    if (activeFilter.startsWith('category-')) {
      const categoryId = activeFilter.replace('category-', '');
      const category = CATEGORIES.find(c => c.id === categoryId);
      return category ? `${category.icon} ${category.label}` : 'All Tasks';
    }
    
    return 'All Tasks';
  };

  return (
    <div className="app">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(!sidebarOpen)}
        onNewTask={handleNewTask}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        taskCounts={taskCounts}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="main-content">
        <div className="page-header">
          <h1>{getFilterLabel()}</h1>
          <p>Manage your tasks and stay productive</p>
        </div>

        <Dashboard tasks={tasks} />

        <TaskList
          tasks={filteredTasks}
          onToggle={handleToggleTask}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          sortBy={sortBy}
          setSortBy={setSortBy}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </main>

      {/* Task Form Modal */}
      {showForm && (
        <TaskForm
          task={editingTask}
          onSave={handleSaveTask}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}

export default App;
