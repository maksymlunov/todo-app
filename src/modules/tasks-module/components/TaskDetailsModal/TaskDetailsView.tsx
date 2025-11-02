import { DATE_TIME_FORMAT_MMM_DD_HH_MM_YYYY } from "@/shared/constants/date-formats";
import type { Task } from "@/shared/types/task";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Stack,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import type { FC } from "react";
import { useSearchParams } from "react-router-dom";

export const TaskDetailsView: FC<{ data: Task; onClose: () => void }> = ({
  data,
  onClose,
}) => {
  const [, setSearchParams] = useSearchParams();

  const handleOpenEditView = () => {
    setSearchParams((searchParams) => {
      searchParams.set("edit_task", "true");
      return searchParams;
    });
  };

  return (
    <>
      <DialogContent>
        <Box display="flex" justifyContent="space-between" flexWrap="wrap">
          <Stack>
            <Typography variant="caption" color="textSecondary">
              Title
            </Typography>
            <Typography
              sx={{
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {data.title}
            </Typography>
          </Stack>
          {data.completedAt && (
            <Stack>
              <Typography variant="caption" color="textSecondary">
                Completed at
              </Typography>
              <Typography>
                {format(data.completedAt, DATE_TIME_FORMAT_MMM_DD_HH_MM_YYYY)}
              </Typography>
            </Stack>
          )}
        </Box>
        <Stack>
          <Typography variant="caption" color="textSecondary">
            Description
          </Typography>
          <Typography
            sx={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {data.description}
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" variant="outlined" onClick={onClose}>
          Close
        </Button>
        <Button startIcon={<EditIcon />} onClick={handleOpenEditView}>
          Edit
        </Button>
      </DialogActions>
    </>
  );
};
