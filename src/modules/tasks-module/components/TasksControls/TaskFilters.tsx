import type { MouseEvent } from "react";
import { TASK_FILTERS_STATUSES } from "../../constants/task-filters-statuses";
import {
  useTaskActions,
  useTaskFilters,
  type Filters,
} from "../../store/tasksStore";
import { ToggleButtonGroup, ToggleButton, useMediaQuery } from "@mui/material";

export const TaskFilters = () => {
  const filters = useTaskFilters();
  const { setFilters } = useTaskActions();

  const handleChangeStatus = (
    _e: MouseEvent<HTMLElement>,
    newStatus: Filters["status"] | null
  ) => {
    if (!newStatus) return;
    setFilters({ status: newStatus });
  };

  const isSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  return (
    <>
      <ToggleButtonGroup
        value={filters.status}
        exclusive
        onChange={handleChangeStatus}
        fullWidth={!isSm}
      >
        {TASK_FILTERS_STATUSES.map((status) => (
          <ToggleButton key={status} value={status}>
            {status}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </>
  );
};
