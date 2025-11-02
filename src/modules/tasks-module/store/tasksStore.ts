import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Task } from "@/shared/types/task";
import { useShallow } from "zustand/shallow";
import type { Filters, TasksState } from "./types";
import { filterTasks, sortTasks } from "./helpers";

/**
 * Zustand store for managing tasks and it's filters.
 *
 * - Tasks can be added, removed, updated, or toggled between 'active' and 'completed'.
 * - Tasks and filters are persisted to localStorage using the `persist` middleware.
 * - Filters allow task list customization by status (e.g., all, active, completed).
 *
 * This store includes actions for:
 * - getPreparedTasks (filtered + sorted)
 * - setFilters
 * - updateTask
 * - and more...
 */
const useTasksStore = create<TasksState>()(
  persist(
    (set, get) => ({
      tasks: [],
      filters: {
        status: "all",
      },
      actions: {
        getPreparedTasks: (overrideFilters?: Filters) => {
          const { tasks, filters } = get();
          const activeFilters = overrideFilters ?? filters;

          const filteredTasks = filterTasks(tasks, activeFilters);
          const sortedTasks = sortTasks(filteredTasks);

          return sortedTasks;
        },
        addTask: (newTask) => {
          set((state) => ({
            tasks: [
              ...state.tasks,
              {
                id: crypto.randomUUID(),
                status: "active",
                createdAt: new Date(),
                ...newTask,
              },
            ],
          }));
        },
        removeTask: (taskId) => {
          set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== taskId),
          }));
        },
        toggleTaskStatus: (taskId) => {
          set((state) => {
            const updatedTasks: Task[] = state.tasks.map((task) =>
              task.id === taskId
                ? {
                    ...task,
                    status:
                      task.status === "completed" ? "active" : "completed",
                    completedAt: task.status === "active" ? new Date() : null,
                  }
                : task
            );

            return { tasks: updatedTasks };
          });
        },
        updateTask: (taskId, updatedTaskFields) => {
          set((state) => ({
            tasks: state.tasks.map((task) => {
              if (task.id === taskId) {
                // if 'status' was changed than 'completedAt' field have to be updated to prevent errors and ui problems
                if (task.status !== updatedTaskFields.status) {
                  return {
                    ...task,
                    ...updatedTaskFields,
                    completedAt:
                      updatedTaskFields.status === "completed"
                        ? new Date()
                        : null,
                  };
                }
                return { ...task, ...updatedTaskFields };
              }
              return task;
            }),
          }));
        },
        setFilters: (newFilters) => {
          set((state) => ({ filters: { ...state.filters, ...newFilters } }));
        },
      },
    }),
    {
      name: "tasks-storage",
      partialize: (state) => ({ tasks: state.tasks, filters: state.filters }),
    }
  )
);

export const useTasks = () => useTasksStore((state) => state.tasks);
export const useTaskFilters = () => useTasksStore((state) => state.filters);
export const useTaskActions = () => useTasksStore((state) => state.actions);

/**
 * Returns tasks after applying filters and sorting.
 * Uses `useShallow` to avoid React's "Maximum update depth exceeded" error
 * that can occur if re-renders aren't memoized properly.
 */
export const usePreparedTasks = (overrideFilters?: Filters) =>
  useTasksStore(
    useShallow((state) => state.actions.getPreparedTasks(overrideFilters))
  );

export const useGetTaskById = (id: string) =>
  useTasksStore((state) => state.tasks.find((task) => task.id === id));

export * from "./types";
