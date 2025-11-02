import type { Task } from "@/shared/types/task";
import type { Filters } from "./types";

export const filterTasks = (tasks: Task[], filters: Filters) => {
  return filters.status === "all"
    ? tasks
    : tasks.filter((task) => task.status === filters.status);
};


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
