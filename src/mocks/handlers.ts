import { delay, HttpResponse, http, type PathParams } from 'msw';
import type { Task } from '@/features/board/types/task';
import { mockTasks } from './db';

export const handlers = [
  // Intercept GET /api/tasks
  http.get<never, Task[], Task[]>('/api/tasks', async () => {
    await delay(800);
    return HttpResponse.json(mockTasks);
  }),

  // Intercept POST /api/tasks
  http.post<never, Task, Task>('/api/tasks', async ({ request }) => {
    const newTask = await request.json();
    mockTasks.push(newTask); // Update our "database"
    await delay(1000);
    return HttpResponse.json(newTask, { status: 201 });
  }),

  http.patch<PathParams<'id'>, Task, Task>(
    '/api/tasks/:id',
    async ({ request, params }) => {
      const { id } = params;
      const updatedTask = await request.json();
      const task = mockTasks.find((task) => task.id === id);
      if (!task) {
        return HttpResponse.error();
      }
      Object.assign(task, updatedTask);
      return HttpResponse.json(task);
    }
  ),
];
