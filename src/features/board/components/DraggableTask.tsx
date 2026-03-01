'use client';

import { Draggable } from '@hello-pangea/dnd';
import type { Task } from '../types/task';
import TaskCard from './TaskCard';

// (Pure Component) Simply displays data.

interface DraggableTaskProps {
  index: number;
  isError: boolean;
  isPending: boolean;
  task: Task;
}

const DraggableTask = ({
  index,
  isError,
  isPending,
  task,
}: DraggableTaskProps) => {
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
      {(provided, snapshot) => (
        <div
          className="outline-none"
          ref={provided.innerRef}
          style={styles}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <TaskCard isDragging={snapshot.isDragging} task={task} />
        </div>
      )}
    </Draggable>
  );
};

export default DraggableTask;
