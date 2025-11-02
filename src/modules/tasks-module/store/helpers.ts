import type { Task } from "@/shared/types/task";
import type { Filters } from "./types";

// filters tasks by status
export const filterTasks = (tasks: Task[], filters: Filters) => {
  return filters.status === "all"
    ? tasks
    : tasks.filter((task) => task.status === filters.status);
};

// Sort tasks according to the following rules:
// - Completed tasks are sorted by their `completedAt` date.
// - Active tasks are sorted by their `createdAt` date.
// - All completed tasks are placed at the end of the list.
export const sortTasks = (tasks: Task[]) => {
  return tasks.toSorted((a, b) => {
    if (a.status === "active" && b.status === "completed") return -1;
    if (a.status === "completed" && b.status === "active") return 1;
    if (a.status === "active" && b.status === "active") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (a.status === "completed" && b.status === "completed") {
      if (a.completedAt && b.completedAt) {
        return (
          new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime()
        );
      }
      throw new Error("completedAt field is not provided for completed task");
    }

    return 0;
  });
};
