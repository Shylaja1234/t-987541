
import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import TaskCard from './TaskCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import TaskForm from './TaskForm';
import { TaskCategory } from '../types';
import { Label } from './ui/label';

const TaskList: React.FC = () => {
  const { tasks, categories } = useTaskContext();
  const [categoryFilter, setCategoryFilter] = useState<string | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<string | 'all'>('all');
  const [sort, setSort] = useState<'dueDate' | 'priority' | 'createdAt'>('dueDate');
  
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const handleEditTask = (taskId: string) => {
    setSelectedTask(taskId);
    setIsTaskModalOpen(true);
  };

  const filteredAndSortedTasks = tasks
    .filter((task) => {
      const categoryMatch = categoryFilter === 'all' || task.categoryId === categoryFilter;
      const statusMatch =
        statusFilter === 'all' ||
        (statusFilter === 'completed' && task.completed) ||
        (statusFilter === 'active' && !task.completed);
      return categoryMatch && statusMatch;
    })
    .sort((a, b) => {
      if (sort === 'dueDate') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.getTime() - b.dueDate.getTime();
      } else if (sort === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      } else {
        return b.createdAt.getTime() - a.createdAt.getTime();
      }
    });

  const selectedTaskData = tasks.find((task) => task.id === selectedTask);

  return (
    <div>
      <div className="mb-6 bg-card p-4 rounded-md shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="category-filter" className="text-sm mb-1 block">Filter by Category</Label>
            <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value)}>
              <SelectTrigger id="category-filter">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category: TaskCategory) => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: category.color }} 
                      />
                      {category.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="status-filter" className="text-sm mb-1 block">Filter by Status</Label>
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value)}>
              <SelectTrigger id="status-filter">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tasks</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="sort-by" className="text-sm mb-1 block">Sort by</Label>
            <Select 
              value={sort} 
              onValueChange={(value) => setSort(value as 'dueDate' | 'priority' | 'createdAt')}
            >
              <SelectTrigger id="sort-by">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dueDate">Due Date</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="createdAt">Created Date</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        {filteredAndSortedTasks.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No tasks found.</p>
          </div>
        ) : (
          filteredAndSortedTasks.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onEdit={() => handleEditTask(task.id)}
            />
          ))
        )}
      </div>
      
      <Dialog open={isTaskModalOpen} onOpenChange={setIsTaskModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedTask ? 'Edit Task' : 'Add Task'}</DialogTitle>
          </DialogHeader>
          <TaskForm 
            task={selectedTaskData} 
            onSubmit={() => {
              setIsTaskModalOpen(false);
              setSelectedTask(null);
            }} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskList;
