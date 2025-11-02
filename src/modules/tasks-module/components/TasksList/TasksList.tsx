import { Box, Stack, Typography } from "@mui/material";
import { usePreparedTasks } from "../../store/tasksStore";
import { TaskItem } from "../TaskItem/TaskItem";
import { NoTasksMessage } from "./NoTasksMessage";
import { TaskDetailsModal } from "../TaskDetailsModal/TaskDetailsModal";

export const TasksList = () => {
  const tasks = usePreparedTasks();

  return (
    <Box display="flex" flexDirection="column" minHeight={0} height="100%">
      <Typography variant="h6" gutterBottom>
        Your tasks
      </Typography>
      {tasks.length > 0 ? (
        <Stack spacing={1} maxHeight="100%" overflow="auto">
          {tasks.map((task) => (
            <TaskItem key={task.id} data={task} />
          ))}
        </Stack>
      ) : (
        <NoTasksMessage />
      )}
      <TaskDetailsModal />
    </Box>
  );
};
