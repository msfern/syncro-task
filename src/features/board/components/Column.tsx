'use client';

import type { Task } from '../types/task';
import TaskCard from './TaskCard';

//(Layout) Handles the dropping logic and title.

const Column = ({ title, tasks }: { title: string; tasks: Task[] }) => {
  return (
    <div>
      <h2>{title}</h2>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default Column;
