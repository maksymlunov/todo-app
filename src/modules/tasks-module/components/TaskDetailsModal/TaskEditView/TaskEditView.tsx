import { TASK_STATUSES } from "@/shared/constants/tasks/task-statuses";
import type { Task } from "@/shared/types/task";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
} from "@mui/material";
import type { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useTaskActions,
  type UpdateTaskPayload,
} from "../../../store/tasksStore";
import { useSearchParams } from "react-router-dom";
import { updateTaskSchema } from "./schema";

export const TaskEditView: FC<{ data: Task }> = ({ data }) => {
  const [, setSearchParams] = useSearchParams();

  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isDirty },
  } = useForm<UpdateTaskPayload>({
    defaultValues: {
      title: data.title,
      status: data.status,
      description: data.description,
    },
    resolver: yupResolver(updateTaskSchema),
  });

  const handleCloseEditView = () => {
    setSearchParams((searchParams) => {
      searchParams.set("edit_task", "false");
      return searchParams;
    });
  };

  const { updateTask } = useTaskActions();

  const handleEditTask = (values: UpdateTaskPayload) => {
    updateTask(data.id, values);
    handleCloseEditView();
  };

  return (
    <>
      <DialogContent>
        <Stack
          component="form"
          id="edit-task-form"
          onSubmit={handleSubmit(handleEditTask)}
          py={1}
          spacing={2}
        >
          <TextField
            {...register("title")}
            error={Boolean(errors.title)}
            helperText={errors.title?.message}
            label="Title"
          />
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <FormControl>
                <InputLabel>Status</InputLabel>
                <Select {...field} label="Status">
                  {TASK_STATUSES.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
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
        <Button
          color="secondary"
          variant="outlined"
          onClick={handleCloseEditView}
        >
          Cancel
        </Button>
        <Button type="submit" form="edit-task-form" disabled={!isDirty}>
          Save
        </Button>
      </DialogActions>
    </>
  );
};
