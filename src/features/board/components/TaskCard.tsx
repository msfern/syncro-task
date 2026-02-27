'use client';

import type { Task } from '../types/task';

// (Pure Component) Simply displays data.

const TaskCard = ({ task }: { task: Task }) => {
  return <div>{task.title}</div>;
};

export default TaskCard;
