
import React, { createContext, useContext, useState } from 'react';
import { Task, TaskCategory, PriorityLevel, ViewMode } from '../types';
import { format } from 'date-fns';

// Generate dummy data for initial development
const generateDummyData = () => {
  const categories: TaskCategory[] = [
    { id: '1', name: 'Personal', color: '#3B82F6' },
    { id: '2', name: 'Work', color: '#8B5CF6' },
    { id: '3', name: 'Shopping', color: '#EC4899' },
    { id: '4', name: 'Health', color: '#10B981' },
  ];

  const tasks: Task[] = [
    {
      id: '1',
      title: 'Complete project proposal',
      description: 'Finish the document and send it to the manager',
      completed: false,
      dueDate: new Date(Date.now() + 86400000 * 2), // 2 days from now
      priority: 'high',
      categoryId: '2',
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'Buy groceries',
      description: 'Milk, eggs, bread, and vegetables',
      completed: false,
      dueDate: new Date(Date.now() + 86400000 * 1), // 1 day from now
      priority: 'medium',
      categoryId: '3',
      createdAt: new Date(),
    },
    {
      id: '3',
      title: 'Go for a run',
      description: '30 minutes jogging in the park',
      completed: true,
      dueDate: new Date(),
      priority: 'low',
      categoryId: '4',
      createdAt: new Date(Date.now() - 86400000 * 1), // 1 day ago
    },
    {
      id: '4',
      title: 'Call mom',
      description: 'Wish her happy birthday',
      completed: false,
      dueDate: new Date(Date.now() + 86400000 * 3), // 3 days from now
      priority: 'medium',
      categoryId: '1',
      createdAt: new Date(),
    },
    {
      id: '5',
      title: 'Prepare presentation',
      description: 'Create slides for next week\'s meeting',
      completed: false,
      dueDate: new Date(Date.now() + 86400000 * 5), // 5 days from now
      priority: 'high',
      categoryId: '2',
      createdAt: new Date(),
    },
  ];

  return { categories, tasks };
};

const { categories: initialCategories, tasks: initialTasks } = generateDummyData();

// Context type
type TaskContextType = {
  tasks: Task[];
  categories: TaskCategory[];
  viewMode: ViewMode;
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (taskId: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  deleteTask: (taskId: string) => void;
  toggleTaskCompletion: (taskId: string) => void;
  addCategory: (category: Omit<TaskCategory, 'id'>) => void;
  updateCategory: (categoryId: string, updates: Partial<Omit<TaskCategory, 'id'>>) => void;
  deleteCategory: (categoryId: string) => void;
  getTasksByDate: (date: Date) => Task[];
  getCategoryById: (categoryId?: string) => TaskCategory | undefined;
};

// Create context
export const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Provider component
export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [categories, setCategories] = useState<TaskCategory[]>(initialCategories);
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  // Add a new task
  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    };
    setTasks([...tasks, newTask]);
  };

  // Update an existing task
  const updateTask = (taskId: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, ...updates } : task)));
  };

  // Delete a task
  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Toggle task completion status
  const toggleTaskCompletion = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Add a new category
  const addCategory = (category: Omit<TaskCategory, 'id'>) => {
    const newCategory: TaskCategory = {
      ...category,
      id: Math.random().toString(36).substr(2, 9),
    };
    setCategories([...categories, newCategory]);
  };

  // Update an existing category
  const updateCategory = (categoryId: string, updates: Partial<Omit<TaskCategory, 'id'>>) => {
    setCategories(
      categories.map((category) =>
        category.id === categoryId ? { ...category, ...updates } : category
      )
    );
  };

  // Delete a category
  const deleteCategory = (categoryId: string) => {
    setCategories(categories.filter((category) => category.id !== categoryId));
    // You might want to update tasks that had this category
    setTasks(
      tasks.map((task) =>
        task.categoryId === categoryId ? { ...task, categoryId: undefined } : task
      )
    );
  };

  // Get tasks for a specific date
  const getTasksByDate = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    return tasks.filter((task) => {
      if (!task.dueDate) return false;
      return format(task.dueDate, 'yyyy-MM-dd') === formattedDate;
    });
  };

  // Get category by ID
  const getCategoryById = (categoryId?: string) => {
    if (!categoryId) return undefined;
    return categories.find((category) => category.id === categoryId);
  };

  const value = {
    tasks,
    categories,
    viewMode,
    setViewMode,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    addCategory,
    updateCategory,
    deleteCategory,
    getTasksByDate,
    getCategoryById,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

// Custom hook to use the context
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
