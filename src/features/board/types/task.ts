import { z } from "zod";

export const TaskPrioritySchema = z.enum(["low", "medium", "high"]);
export const TaskStatusSchema = z.enum(["todo", "in-progress", "done"]);

export const TaskSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().optional(),
  priority: TaskPrioritySchema,
  status: TaskStatusSchema,
  createdAt: z.date(),
  userId: z.string(),
});

// Extract the Type from the Schema
export type Task = z.infer<typeof TaskSchema>;

// This is the type that will be used in the UI
export type TaskWithUiState = Task & {
  syncStatus?: "synced" | "pending" | "error";
};
