'use client';

import type { Task } from '../types/task';

// (Pure Component) Simply displays data.

interface TaskCardProps {
  // This allows us to pass in extra UI like a "Delete" button later
  extra?: React.ReactNode;
  isDragging?: boolean;
  task: Task;
}

const TaskCard = ({ task, isDragging, extra }: TaskCardProps) => {
  return (
    <div
      className={`mb-3 rounded-lg border bg-[#1a1a1a] p-4 transition-all ${isDragging ? 'scale-105 border-blue-500 shadow-2xl' : 'border-gray-800'}
    `}
    >
      <div className="flex items-start justify-between">
        <h4 className="font-medium text-gray-200 text-sm">{task.title}</h4>
        {extra}
      </div>
      {task.description && (
        <p className="mt-2 line-clamp-2 text-gray-500 text-xs">
          {task.description}
        </p>
      )}
    </div>
  );
};

export default TaskCard;
