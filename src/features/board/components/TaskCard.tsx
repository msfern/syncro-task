'use client';

import { Draggable } from '@hello-pangea/dnd';
import type { Task } from '../types/task';

// (Pure Component) Simply displays data.

const TaskCard = ({
  index,
  isError,
  task,
  isPending,
}: {
  index: number;
  isError: boolean;
  task: Task;
  isPending: boolean;
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
  };
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="rounded-md p-2"
          ref={provided.innerRef}
          style={styles}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p>{task.title}</p>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
