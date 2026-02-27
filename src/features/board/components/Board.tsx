'use client';
import { useTasks } from '../api/useTasks';
import Column from './Column';

// (Container) Handles the data fetching and DragDropContext

const Board = () => {
  const { data: tasks = [], isLoading, isError, error } = useTasks();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  if (tasks.length === 0) {
    return <div>No tasks found</div>;
  }

  return (
    <main className="flex grid-cols-1 flex-col items-center gap-4 p-4">
      <header className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">Board</h1>
        {/* <button
          className="rounded-md bg-blue-500 px-4 py-2 text-white"
          type="button"
        >
          New Task
        </button> */}
      </header>
      <div className="flex gap-4">
        <Column
          tasks={tasks.filter((task) => task.status === 'todo')}
          title="Todo"
        />
        <Column
          tasks={tasks.filter((task) => task.status === 'in-progress')}
          title="In Progress"
        />
        <Column
          tasks={tasks.filter((task) => task.status === 'done')}
          title="Done"
        />
      </div>
    </main>
  );
};

export default Board;
