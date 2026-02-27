import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { type Task, TaskSchema } from "../types/task";

export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async (): Promise<Task[]> => {
      const response = await fetch("/api/tasks");
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();

      // Validate the entire array at runtime
      return z.array(TaskSchema).parse(data);
    },
  });
};
