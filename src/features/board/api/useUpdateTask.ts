import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Task } from '../types/task';

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedTask: Task) => {
      const response = await fetch(`/api/tasks/${updatedTask.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ ...updatedTask, status: 'done' }),
      });
      if (!response.ok) {
        throw new Error('Failed to move task to done');
      }
      return response.json();
    },
    onMutate: async (updatedTask: Task) => {
      // 1. Cancel outgoing refetches
      // This is to ensure that we are not fetching the tasks while we are updating one
      await queryClient.cancelQueries({ queryKey: ['tasks'] });

      // 2. Snapshot the current state
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);

      // 3. Optimistically update the cache
      queryClient.setQueryData(['tasks'], (old: Task[] | undefined) => {
        return old?.map((t) => (t.id === updatedTask.id ? updatedTask : t));
      });

      // 4. Return context for rollback
      return { previousTasks };
    },
    // If the mutation fails,
    // use the result returned from onMutate to roll back
    onError: (_error, _variables, onMutateResult) => {
      // 5. Rollback on error
      queryClient.setQueryData(['tasks'], onMutateResult?.previousTasks);
    },
    // Always refetch after error or success:
    onSettled: () => {
      // 6. Refetch to ensure we are in sync
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
