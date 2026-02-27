import { delay, HttpResponse, http } from "msw";
import type { Task, TaskWithUiState } from "@/features/board/types/task";
import { mockTasks } from "./db";

export const handlers = [
  // Intercept GET /api/tasks
  http.get<never, never, TaskWithUiState[]>("/api/tasks", async () => {
    await delay(800);
    return HttpResponse.json(mockTasks);
  }),

  // Intercept POST /api/tasks
  http.post("/api/tasks", async ({ request }) => {
    const newTask = (await request.json()) as Task;
    mockTasks.push(newTask); // Update our "database"
    await delay(1000);
    return HttpResponse.json(newTask, { status: 201 });
  }),
];
