import { describe, expect, it } from 'vitest';
import type { Task } from '../types/task';
import { reorder } from './reorder';

const mockTasks: Partial<Task>[] = [
  { id: '1', title: 'Task 1' },
  { id: '2', title: 'Task 2' },
  { id: '3', title: 'Task 3' },
];

describe('reorder', () => {
  it('should move an item from the start to the end', () => {
    const result = reorder(mockTasks as Task[], 0, 2);

    expect(result[0].id).toBe('2');
    expect(result[1].id).toBe('3');
    expect(result[2].id).toBe('1');
  });

  it('should move an item from the end to the middle', () => {
    const result = reorder(mockTasks as Task[], 2, 1);

    expect(result[0].id).toBe('1');
    expect(result[1].id).toBe('3');
    expect(result[2].id).toBe('2');
  });

  it('should not mutate the original array', () => {
    const original = [...mockTasks] as Task[];
    reorder(original, 0, 2);

    expect(original[0].id).toBe('1'); // Still Task 1
  });
});
