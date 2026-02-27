import { useQuery } from '@tanstack/react-query';
import { type Task, TaskSchema } from '../types/task';

export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async (): Promise<Task[]> => {
      const response = await fetch('/api/tasks');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const data = await response.json();

      // Validate the entire array at runtime
      const result = await TaskSchema.array().safeParseAsync(data);
      if (result.error) {
        throw new Error(result.error.message);
      }
      return result.data;
    },
  });
};
