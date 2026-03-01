import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Task } from '../types/task';
import { reorder } from '../utils/reorder';

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      updatedTask,
      newIndex,
    }: {
      updatedTask: Task;
      newIndex: number;
    }) => {
      const response = await fetch(`/api/tasks/${updatedTask.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ ...updatedTask, newIndex }),
      });
      if (!response.ok) {
        throw new Error('Failed to move task to done');
      }
      return response.json();
    },
    onMutate: async ({
      updatedTask,
      newIndex,
    }: {
      updatedTask: Task;
      newIndex: number;
    }) => {
      // 1. Cancel outgoing refetches
      // This is to ensure that we are not fetching the tasks while we are updating one
      await queryClient.cancelQueries({ queryKey: ['tasks'] });

      // 2. Snapshot the current state
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks']) ?? [];

      // Find current index of the task
      const currentIndex = previousTasks.findIndex(
        (t) => t.id === updatedTask.id
      );

      console.log('currentIndex', currentIndex);

      const updatedTasks = reorder(previousTasks, currentIndex, newIndex);
      console.log('updatedTasks', updatedTasks);

      // 3. Optimistically update the cache
      queryClient.setQueryData(['tasks'], updatedTasks);

      // 4. Return context for rollback
      return { previousTasks };
    },
    onError: (_error, _variables, onMutateResult) => {
      // 5. Rollback on error
      queryClient.setQueryData(['tasks'], onMutateResult?.previousTasks);
    },
    onSettled: () => {
      // 6. Refetch to ensure we are in sync
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
