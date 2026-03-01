import { describe, expect, it } from 'vitest';
import { useTasks } from './useTasks';

describe('useTasks', () => {
  it('should fetch tasks', () => {
    const { data, isLoading, isError, error } = useTasks();
    expect(data).toBeDefined();
    expect(isLoading).toBe(false);
    expect(isError).toBe(false);
    expect(error).toBeUndefined();
  });
});
