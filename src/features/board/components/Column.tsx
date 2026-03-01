'use client';

import { Droppable } from '@hello-pangea/dnd';
import { useUpdateTask } from '../api/useUpdateTask';
import type { Column as ColumnProps } from '../types/column';
import type { Task } from '../types/task';
import DraggableTask from './DraggableTask';

//(Layout) Handles the dropping logic and title.

const Column = ({ status, tasks, title }: ColumnProps) => {
  const { isPending, isError } = useUpdateTask();

  return (
    <section className="flex flex-col items-center gap-4">
      <h2>{title}</h2>
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={{
              backgroundColor: snapshot.isDraggingOver ? 'yellow' : 'green',
            }}
            {...provided.droppableProps}
          >
            {tasks.map((task: Task, index: number) => (
              <DraggableTask
                index={index}
                isError={isError}
                isPending={isPending}
                key={task.id}
                task={task}
              />
            ))}

            {/* 2. Placeholder prevents the column from collapsing */}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </section>
  );
};

export default Column;
