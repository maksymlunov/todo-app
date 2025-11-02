import { Box, Divider } from "@mui/material";
import { TasksCounter, type TaskCounterProps } from "./TasksCounter";
import { Fragment } from "react";

const FILTERS: TaskCounterProps[] = [
  { filters: { status: "active" }, label: "Active" },
  { filters: { status: "completed" }, label: "Completed" },
  { filters: { status: "all" }, label: "Total tasks" },
];

export const TasksStatistics = () => (
  <Box display="flex">
    {FILTERS.map(({ filters, label }, index) => (
      <Fragment key={label}>
        {index > 0 && <Divider orientation="vertical" flexItem />}
        <TasksCounter filters={filters} label={label} />
      </Fragment>
    ))}
  </Box>
);
