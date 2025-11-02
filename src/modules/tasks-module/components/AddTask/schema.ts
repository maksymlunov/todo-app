import * as yup from "yup";
import type { AddTaskPayload } from "../../store/types";

export const addTaskSchema = yup.object({
  title: yup.string().required("Field is required"),
  description: yup.string().required("Field is required"),
}) satisfies yup.Schema<AddTaskPayload>;
