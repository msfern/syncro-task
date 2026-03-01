import type { Task } from './task';

export interface Column {
  status: Task['status'];
  tasks: Task[];
  title: string;
}
