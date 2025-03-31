
import React from 'react';
import { format } from 'date-fns';
import { Task } from '../types';
import { Card, CardContent } from './ui/card';
import { Checkbox } from './ui/checkbox';
import PriorityBadge from './PriorityBadge';
import CategoryTag from './CategoryTag';
import { CalendarIcon, Trash2, Edit } from 'lucide-react';
import { Button } from './ui/button';
import { useTaskContext } from '../context/TaskContext';

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  const { toggleTaskCompletion, deleteTask } = useTaskContext();

  return (
    <Card className={`mb-4 ${task.completed ? 'opacity-70' : ''}`}>
      <CardContent className="p-5">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => toggleTaskCompletion(task.id)}
            className="mt-1"
          />
          <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
              <h3 className={`font-medium text-base ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                {task.title}
              </h3>
              <div className="flex items-center gap-2">
                <PriorityBadge priority={task.priority} />
              </div>
            </div>
            {task.description && (
              <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
            )}
            <div className="flex flex-wrap items-center gap-3 mt-3">
              {task.dueDate && (
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  <span>{format(task.dueDate, 'MMM d, yyyy')}</span>
                </div>
              )}
              <CategoryTag categoryId={task.categoryId} />
              <div className="flex-1"></div>
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0" 
                  onClick={onEdit}
                >
                  <Edit className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0" 
                  onClick={() => deleteTask(task.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
