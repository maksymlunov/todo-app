import type { FC } from "react";
import { usePreparedTasks, type Filters } from "../../store/tasksStore";
import { Stack, Typography } from "@mui/material";

export type TaskCounterProps = { filters: Filters; label: string };

export const TasksCounter: FC<TaskCounterProps> = ({ filters, label }) => {
  const foundTodos = usePreparedTasks(filters);

  return (
    <Stack flex={1} alignItems="center">
      <Typography>{foundTodos.length}</Typography>
      <Typography color="textSecondary">{label}</Typography>
    </Stack>
  );
};
