// Category definitions with colors and icons
export const CATEGORIES = [
  { id: 'work', label: 'Work', icon: '💼', color: '#3b82f6' },
  { id: 'personal', label: 'Personal', icon: '👤', color: '#d946ef' },
  { id: 'shopping', label: 'Shopping', icon: '🛒', color: '#10b981' },
  { id: 'health', label: 'Health', icon: '❤️', color: '#ef4444' },
  { id: 'finance', label: 'Finance', icon: '💰', color: '#f59e0b' },
  { id: 'learning', label: 'Learning', icon: '📚', color: '#6366f1' },
  { id: 'home', label: 'Home', icon: '🏠', color: '#8b5cf6' },
  { id: 'other', label: 'Other', icon: '📌', color: '#64748b' },
];

// Get category by ID
export const getCategoryById = (id) => {
  return CATEGORIES.find(cat => cat.id === id) || CATEGORIES[CATEGORIES.length - 1];
};
