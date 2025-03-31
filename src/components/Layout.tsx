
import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import { Calendar, List, Plus } from 'lucide-react';
import { Button } from './ui/button';

interface LayoutProps {
  children: React.ReactNode;
  onOpenAddTask: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onOpenAddTask }) => {
  const { viewMode, setViewMode } = useTaskContext();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">TaskFlow</h1>
          <div className="flex items-center gap-4">
            <div className="bg-muted rounded-md p-1 flex">
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="flex items-center gap-2"
              >
                <List className="h-4 w-4" />
                <span className="hidden sm:inline">List</span>
              </Button>
              <Button
                variant={viewMode === 'calendar' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('calendar')}
                className="flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Calendar</span>
              </Button>
            </div>
            <Button onClick={onOpenAddTask} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Task</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="border-t py-4 bg-muted/50">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          TaskFlow - Manage your tasks effectively
        </div>
      </footer>
    </div>
  );
};

export default Layout;
