import type { Task } from "@/shared/types/task";
import type { TASK_FILTERS_STATUSES } from "../constants/task-filters-statuses";

export type Filters = {
  status: (typeof TASK_FILTERS_STATUSES)[number];
};

export type AddTaskPayload = Pick<Task, "title" | "description">;
export type UpdateTaskPayload = Omit<Task, "id" | "createdAt">;

export type TasksState = {
  tasks: Task[];
  filters: Filters;
  actions: {
    getPreparedTasks: (overrideFilters?: Filters) => Task[];
    addTask: (newTask: AddTaskPayload) => void;
    removeTask: (taskId: Task["id"]) => void;
    /**
     * Updates task fields by ID. If `status` is changed, also updates `completedAt` accordingly.
     */
    updateTask: (
      taskId: Task["id"],
      updatedTaskFields: UpdateTaskPayload
    ) => void;
    toggleTaskStatus: (taskId: Task["id"]) => void;
    setFilters: (newFilters: Partial<Filters>) => void;
  };
};
