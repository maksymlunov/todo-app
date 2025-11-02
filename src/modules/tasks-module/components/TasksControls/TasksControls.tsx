import { Box } from "@mui/material";
import { TaskFilters } from "./TaskFilters";
import { AddTaskButton } from "../AddTask/AddTaskButton";

export const TasksControls = () => {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      gap={1}
      minHeight={0}
      flexShrink={0}
    >
      <AddTaskButton />
      <TaskFilters />
    </Box>
  );
};
