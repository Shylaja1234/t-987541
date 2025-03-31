
// Task-related types
export type PriorityLevel = 'low' | 'medium' | 'high';

export type TaskCategory = {
  id: string;
  name: string;
  color: string;
};

export type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: Date;
  priority: PriorityLevel;
  categoryId?: string;
  createdAt: Date;
};

// View types
export type ViewMode = 'list' | 'calendar';
