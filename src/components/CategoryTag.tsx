
import React from 'react';
import { useTaskContext } from '../context/TaskContext';

interface CategoryTagProps {
  categoryId?: string;
  size?: 'sm' | 'md';
}

const CategoryTag: React.FC<CategoryTagProps> = ({ categoryId, size = 'md' }) => {
  const { getCategoryById } = useTaskContext();
  const category = getCategoryById(categoryId);

  if (!category) return null;

  return (
    <div className="flex items-center gap-1.5">
      <div 
        className={`rounded-full ${
          size === 'sm' ? 'w-2 h-2' : 'w-3 h-3'
        }`}
        style={{ backgroundColor: category.color }}
      />
      <span className={`${
        size === 'sm' ? 'text-xs' : 'text-sm'
      } text-muted-foreground`}>
        {category.name}
      </span>
    </div>
  );
};

export default CategoryTag;
