import type { Task } from '@/features/board/types/task';

export const mockTasks: Task[] = [
  {
    id: crypto.randomUUID(),
    title: 'Task 1',
    description: 'Task 1 description',
    priority: 'low',
    status: 'todo',
    createdAt: new Date(),
    userId: '1',
  },
  {
    id: crypto.randomUUID(),
    title: 'Task 2',
    description: 'Task 2 description',
    priority: 'medium',
    status: 'in-progress',
    createdAt: new Date(),
    userId: '2',
  },
  {
    id: crypto.randomUUID(),
    title: 'Task 3',
    description: 'Task 3 description',
    priority: 'high',
    status: 'done',
    createdAt: new Date(),
    userId: '3',
  },
  {
    id: crypto.randomUUID(),
    title: 'Task 4',
    description: 'Task 4 description',
    priority: 'low',
    status: 'todo',
    createdAt: new Date(),
    userId: '4',
  },
];
