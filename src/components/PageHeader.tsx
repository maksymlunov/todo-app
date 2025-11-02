import { Box, Typography } from "@mui/material";
import { CurrentTime } from "./CurrentTime";

export const PageHeader = () => {
  return (
    <Box
      component="header"
      display="flex"
      justifyContent="space-between"
      p={1}
      flexShrink={0}
    >
      <Typography variant="caption">Task manager</Typography>
      <CurrentTime />
    </Box>
  );
};
