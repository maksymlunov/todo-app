import { TASK_STATUSES } from "@/shared/constants/tasks/task-statuses";

export const TASK_FILTERS_STATUSES = ["all", ...TASK_STATUSES] as const;
