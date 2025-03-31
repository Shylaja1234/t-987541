
import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import TaskForm from './TaskForm';
import CategoryTag from './CategoryTag';
import PriorityBadge from './PriorityBadge';
import { Task } from '../types';

const CalendarView: React.FC = () => {
  const { tasks, getTasksByDate } = useTaskContext();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  // Get the day of week names
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Calculate tasks for the selected date
  const selectedDateTasks = selectedDate ? getTasksByDate(selectedDate) : [];

  return (
    <div>
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{format(currentMonth, 'MMMM yyyy')}</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setCurrentMonth(new Date())}>
              <CalendarIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((day) => (
            <div key={day} className="text-center font-medium text-sm p-2">
              {day}
            </div>
          ))}

          {/* Empty cells for days of the week before the first day of the month */}
          {Array.from({ length: days[0].getDay() }).map((_, index) => (
            <div key={`empty-start-${index}`} className="p-2"></div>
          ))}

          {days.map((day) => {
            const dayTasks = getTasksByDate(day);
            const isToday = isSameDay(day, new Date());
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            
            return (
              <div
                key={day.toString()}
                className={`
                  border rounded-md p-1 min-h-[100px] 
                  ${isToday ? 'bg-primary/5 border-primary' : 'hover:bg-muted/50 cursor-pointer'} 
                  ${isSelected ? 'ring-2 ring-primary ring-offset-1' : ''}
                  ${!isSameMonth(day, currentMonth) ? 'text-muted-foreground' : ''}
                `}
                onClick={() => handleDateClick(day)}
              >
                <div className="text-right text-sm p-1">{format(day, 'd')}</div>
                <div className="space-y-1">
                  {dayTasks.slice(0, 3).map((task) => (
                    <div
                      key={task.id}
                      className={`
                        text-xs p-1 rounded truncate ${
                          task.completed 
                            ? 'line-through text-muted-foreground bg-muted/50' 
                            : 'bg-muted hover:bg-muted/80'
                        }
                      `}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTaskClick(task);
                      }}
                    >
                      {task.title}
                    </div>
                  ))}
                  {dayTasks.length > 3 && (
                    <div className="text-xs text-muted-foreground text-center">
                      +{dayTasks.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {selectedDate && (
        <Card className="mt-4 p-4">
          <h3 className="text-lg font-medium mb-3">
            Tasks for {format(selectedDate, 'MMMM d, yyyy')}
          </h3>
          {selectedDateTasks.length === 0 ? (
            <p className="text-muted-foreground text-sm">No tasks for this day.</p>
          ) : (
            <div className="space-y-2">
              {selectedDateTasks.map((task) => (
                <div
                  key={task.id}
                  className={`
                    p-3 rounded-md border ${task.completed ? 'bg-muted/30' : 'bg-card'} 
                    hover:bg-muted/20 cursor-pointer
                  `}
                  onClick={() => handleTaskClick(task)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {task.title}
                      </h4>
                      {task.description && (
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                          {task.description}
                        </p>
                      )}
                    </div>
                    <PriorityBadge priority={task.priority} />
                  </div>
                  {task.categoryId && (
                    <div className="mt-2">
                      <CategoryTag categoryId={task.categoryId} size="sm" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      <Dialog open={isTaskModalOpen} onOpenChange={setIsTaskModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <TaskForm 
            task={selectedTask ?? undefined} 
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

export default CalendarView;
