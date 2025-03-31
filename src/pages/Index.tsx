
import React, { useState } from 'react';
import { TaskProvider } from '../context/TaskContext';
import Layout from '../components/Layout';
import TaskList from '../components/TaskList';
import CalendarView from '../components/CalendarView';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import TaskForm from '@/components/TaskForm';
import { useTaskContext } from '@/context/TaskContext';

// Main component that uses the context
const TaskDashboard: React.FC = () => {
  const { viewMode } = useTaskContext();
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  return (
    <Layout onOpenAddTask={() => setIsAddTaskOpen(true)}>
      {viewMode === 'list' ? <TaskList /> : <CalendarView />}

      <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <TaskForm onSubmit={() => setIsAddTaskOpen(false)} />
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

// Wrapper component to provide the context
const Index: React.FC = () => {
  return (
    <TaskProvider>
      <TaskDashboard />
    </TaskProvider>
  );
};

export default Index;
