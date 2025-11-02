import { Paper, styled } from "@mui/material";

export const PagePaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  flex: 1,
  padding: theme.spacing(2),
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(4),
  },
  borderTopLeftRadius: "24px",
  borderTopRightRadius: "24px",
  minHeight: 0,
}));
