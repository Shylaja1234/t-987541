
import React from 'react';
import { Badge } from './ui/badge';
import { PriorityLevel } from '../types';
import { AlertTriangle, ArrowDown, ArrowUp } from 'lucide-react';

interface PriorityBadgeProps {
  priority: PriorityLevel;
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const getPriorityConfig = () => {
    switch (priority) {
      case 'high':
        return {
          text: 'High',
          color: 'bg-priority-high/15 text-priority-high border-priority-high/30 hover:bg-priority-high/20',
          icon: <AlertTriangle className="h-3 w-3 mr-1" />
        };
      case 'medium':
        return {
          text: 'Medium',
          color: 'bg-priority-medium/15 text-priority-medium border-priority-medium/30 hover:bg-priority-medium/20',
          icon: <ArrowUp className="h-3 w-3 mr-1" />
        };
      case 'low':
        return {
          text: 'Low',
          color: 'bg-priority-low/15 text-priority-low border-priority-low/30 hover:bg-priority-low/20',
          icon: <ArrowDown className="h-3 w-3 mr-1" />
        };
      default:
        return {
          text: 'Unknown',
          color: 'bg-muted text-muted-foreground',
          icon: null
        };
    }
  };

  const { text, color, icon } = getPriorityConfig();

  return (
    <Badge variant="outline" className={`${color} flex items-center`}>
      {icon}
      {text}
    </Badge>
  );
};

export default PriorityBadge;
