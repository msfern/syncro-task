'use client';

import { useUpdateTask } from '../api/useUpdateTask';
import type { Task } from '../types/task';
import TaskCard from './TaskCard';

//(Layout) Handles the dropping logic and title.

const Column = ({ title, tasks }: { title: string; tasks: Task[] }) => {
  const { mutate: updateTask, isPending, isError } = useUpdateTask();
  return (
    <div className="flex flex-col gap-2">
      <h2>{title}</h2>
      {tasks.map((task) => (
        <TaskCard
          isError={isError}
          isPending={isPending}
          key={task.id}
          task={task}
          updateTask={updateTask}
        />
      ))}
    </div>
  );
};

export default Column;
