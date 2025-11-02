import { DATE_TIME_FORMAT_MMM_DD_HH_MM } from "@/shared/constants/date-formats";
import { Typography } from "@mui/material";
import { format } from "date-fns";
import { useEffect, useState } from "react";

export const CurrentTime = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Typography variant="caption">
      {format(time, DATE_TIME_FORMAT_MMM_DD_HH_MM)}
    </Typography>
  );
};
