import type { DropResult } from '@hello-pangea/dnd';
import { useCallback } from 'react';
import { useUpdateTask } from '../api/useUpdateTask';
import type { Task } from '../types/task';

const useBoardLogic = (tasks: Task[]) => {
  const { mutate: updateTask } = useUpdateTask();

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination, draggableId } = result;

      if (!destination) {
        // 1. Dropped outside a list
        return;
      }
      if (
        source.index === destination.index &&
        source.droppableId === destination.droppableId
      ) {
        // 2. Dropped in the same spot
        return;
      }

      // 3. Find the task that was dragged
      const task = tasks.find((t) => t.id === draggableId);
      if (!task) {
        return;
      }

      // 4. Trigger the mutation with the new status
      updateTask({
        updatedTask: {
          ...task,
          status: destination.droppableId as Task['status'],
        },
        newIndex: destination.index,
      });
    },
    [tasks, updateTask]
  );

  const taskByStatus = {
    todo: tasks.filter((task) => task.status === 'todo'),
    'in-progress': tasks.filter((task) => task.status === 'in-progress'),
    done: tasks.filter((task) => task.status === 'done'),
  };
  return { taskByStatus, onDragEnd };
};

export default useBoardLogic;
