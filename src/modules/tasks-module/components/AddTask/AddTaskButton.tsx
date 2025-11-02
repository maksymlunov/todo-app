import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { useState } from "react";
import { AddTaskModal } from "./AddTaskModal";

export const AddTaskButton = () => {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        endIcon={<AddIcon />}
        sx={{ width: "fit-content !important" }}
        title="Add task"
      >
        Add
      </Button>
      <AddTaskModal isOpen={isOpen} onClose={handleClose} />
    </>
  );
};
