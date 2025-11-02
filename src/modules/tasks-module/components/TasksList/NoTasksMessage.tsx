import { Box, Typography } from "@mui/material";

export const NoTasksMessage = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" flex={1}>
      <Typography color="textSecondary">No tasks found</Typography>
    </Box>
  );
};
