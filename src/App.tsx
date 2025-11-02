import { Box } from "@mui/material";
import { PageHeader } from "@/components/PageHeader";
import {
  TasksControls,
  TasksStatistics,
  TasksList,
} from "@/modules/tasks-module";
import { PagePaper } from "./shared/ui/PagePaper";

export const App = () => {
  return (
    <Box
      height="100dvh"
      width="100vw"
      display="flex"
      flexDirection="column"
      alignItems="center"
      maxHeight="100dvh"
    >
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        height="100%"
        maxHeight="100%"
        maxWidth="1000px"
        gap={4}
      >
        <PageHeader />
        <TasksStatistics />
        <PagePaper>
          <TasksControls />
          <TasksList />
        </PagePaper>
      </Box>
    </Box>
  );
};
