import type { FC } from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useTaskActions, type AddTaskPayload } from "../../store/tasksStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { addTaskSchema } from "./schema";

type AddTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AddTaskModal: FC<AddTaskModalProps> = ({ isOpen, onClose }) => {
  const { addTask } = useTaskActions();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted, isValid },
  } = useForm<AddTaskPayload>({
    defaultValues: {
      title: "",
      description: "",
    },
    resolver: yupResolver(addTaskSchema),
  });

  const handleClose = () => {
    onClose();
    reset();
  };

  const handleAddTask = (values: AddTaskPayload) => {
    addTask(values);
    handleClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>Add new task</DialogTitle>
      <DialogContent>
        <Stack
          component="form"
          id="add-task-form"
          onSubmit={handleSubmit(handleAddTask)}
          py={1}
          spacing={2}
        >
          <TextField
            {...register("title")}
            error={Boolean(errors.title)}
            helperText={errors.title?.message}
            label="Title"
          />
          <TextField
            {...register("description")}
            error={Boolean(errors.description)}
            helperText={errors.description?.message}
            label="Description"
            multiline
            minRows={3}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          endIcon={<AddIcon />}
          type="submit"
          form="add-task-form"
          disabled={isSubmitted && !isValid}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
