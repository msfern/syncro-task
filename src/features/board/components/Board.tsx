'use client';
import { DragDropContext } from '@hello-pangea/dnd';
import { useTasks } from '../api/useTasks';
import useBoardLogic from '../hooks/useBoardLogic';
import type { Column as ColumnProps } from '../types/column';
import BoardSkeleton from './BoardSkeleton';
import Column from './Column';

const COLUMNS: { id: ColumnProps['status']; title: string }[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];

const Board = () => {
  const { data: tasks = [], isLoading, isError, error } = useTasks();
  const { taskByStatus, onDragEnd } = useBoardLogic(tasks);

  if (isLoading) {
    return <BoardSkeleton />;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  if (tasks.length === 0) {
    return <div>No tasks found</div>;
  }

  return (
    <main className="flex flex-col items-center gap-4 p-4">
      <header className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">Board</h1>
      </header>
      <div className="flex items-center gap-4">
        <DragDropContext onDragEnd={onDragEnd}>
          {COLUMNS.map((col) => (
            <Column
              key={col.id}
              status={col.id}
              tasks={taskByStatus[col.id]}
              title={col.title}
            />
          ))}
        </DragDropContext>
      </div>
    </main>
  );
};

export default Board;
