import { Checkbox, Fade, Stack, Typography } from "@mui/material";
import { useMemo, useState, type FC } from "react";
import type { Task } from "@/shared/types/task";
import { useTaskActions } from "../../store/tasksStore";
import { ActionMenu } from "@/shared/ui/ActionMenu";
import { StyledPaper } from "./components";
import { useSearchParams } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export const TaskItem: FC<{ data: Task }> = ({ data }) => {
  const { removeTask, toggleTaskStatus } = useTaskActions();
  const [visible, setVisible] = useState(true);
  const [, setSearchParams] = useSearchParams();
  const isCompleted = data.status === "completed";

  const handleOpenTaskDetails = (editMode: boolean) => {
    setSearchParams((searchParams) => {
      searchParams.set("task_id", data.id);
      searchParams.set("edit_task", JSON.stringify(editMode));
      return searchParams;
    });
  };

  const actionMenuOptions = useMemo(
    () => [
      {
        label: "Open details",
        action: () => handleOpenTaskDetails(false),
        icon: <VisibilityIcon fontSize="small" />,
      },
      {
        label: "Edit",
        action: () => handleOpenTaskDetails(true),
        icon: <EditIcon fontSize="small" />,
      },
      {
        label: "Remove",
        // removes visibility of item so it will call removeTask callback
        action: () => setVisible(false),
        icon: <DeleteIcon fontSize="small" />,
      },
    ],
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <Fade
      in={visible}
      timeout={250}
      mountOnEnter
      unmountOnExit
      // after animation will remove task from store
      onExited={() => removeTask(data.id)}
    >
      <StyledPaper elevation={isCompleted ? 2 : 5}>
        <Stack direction="row" alignItems="center">
          <Checkbox
            size="large"
            checked={isCompleted}
            onChange={() => toggleTaskStatus(data.id)}
            title="Change task status"
          />
          <Typography
            color={isCompleted ? "textSecondary" : "textPrimary"}
            sx={{
              fontWeight: 500,
              maxWidth: { xs: "15ch", sm: "30ch", md: "50ch" },
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {data.title}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <ActionMenu options={actionMenuOptions} />
        </Stack>
      </StyledPaper>
    </Fade>
  );
};
