'use client';

import type { Task } from '../types/task';

// (Pure Component) Simply displays data.

const TaskCard = ({
  isError,
  task,
  isPending,
  updateTask,
}: {
  isError: boolean;
  task: Task;
  isPending: boolean;
  updateTask: (task: Task) => void;
}) => {
  const bgColor = (() => {
    if (isError) {
      return 'red';
    }
    if (isPending) {
      return 'gray';
    }
    return 'blue';
  })();

  const styles = {
    backgroundColor: bgColor,
    cursor: isError || isPending ? 'not-allowed' : 'pointer',
  };
  return (
    <div className="rounded-md p-2" style={styles}>
      <p>{task.title}</p>
      <button
        className="rounded-md bg-blue-500 px-4 py-2 text-white"
        disabled={isError || isPending}
        onClick={() => updateTask(task)}
        type="button"
      >
        Move to Done
      </button>
    </div>
  );
};

export default TaskCard;
