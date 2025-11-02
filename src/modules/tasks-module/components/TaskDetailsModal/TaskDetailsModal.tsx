import { Dialog, DialogTitle } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { TaskEditView } from "./TaskEditView/TaskEditView";
import { TaskDetailsView } from "./TaskDetailsView";
import { useGetTaskById } from "../../store/tasksStore";

export const TaskDetailsModal = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const taskId = searchParams.get("task_id");
  const editMode = searchParams.get("edit_task") === "true";

  const task = useGetTaskById(taskId ?? "");

  if (!task) return null;

  const handleClose = () => {
    setSearchParams((searchParams) => {
      searchParams.delete("task_id");
      searchParams.delete("edit_task");
      return searchParams;
    });
  };
  return (
    <Dialog
      open={Boolean(taskId)}
      fullWidth
      maxWidth="sm"
      onClose={handleClose}
    >
      <DialogTitle>{editMode ? "Edit task" : "Task details"}</DialogTitle>
      {editMode ? (
        <TaskEditView data={task} />
      ) : (
        <TaskDetailsView data={task} onClose={handleClose} />
      )}
    </Dialog>
  );
};
