import type { UpdateTaskPayload } from "../../../store/tasksStore";
import { TASK_STATUSES } from "@/shared/constants/tasks/task-statuses";
import * as yup from "yup";

export const updateTaskSchema = yup.object({
  title: yup.string().required("Field is required"),
  status: yup.string().required("Field is required").oneOf(TASK_STATUSES),
  description: yup.string().required("Field is required"),
}) satisfies yup.Schema<UpdateTaskPayload>;
