import type { TASK_STATUSES } from "../constants/tasks/task-statuses";

export type TaskStatus = (typeof TASK_STATUSES)[number];

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date | string;
  completedAt?: Date | string | null;
};
